// Define some global constants. The client defines the opposite values
global.__CLIENT__ = false;
global.__SERVER__ = true;

import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match} from 'react-router';
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import Helmet from 'react-helmet';

import makeStore from './src/js/redux/store';
import createRoutes from './src/js/routes';

// Only for dev environment
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from 'webpack';

// Le Français
import {addLocaleData} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
addLocaleData(frLocaleData);

const app = express();
app.set('view engine', 'ejs');

/*
  This bit sets up the webpack development middleware with hot reloading.
  In production our asset will be bundled and minified with a separate configuration.
*/
if (process.env.DEV_SERVER === "true") {
  const webpackConfig = require('./webpack.dev.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {
        colors: true
    }
  }));
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
}

/*
  This will be the most visited route of our application: it responds to all paths.
  For each request that comes to our web server, we will create a new store.
  Then, using the match function of react-router, we will receive the tree of components
  to render for the current request URL. <Redirect> routes will result in HTTP 302 responses.
  Regular routes will result in a call to the loadOnServer function from redux-connect. This
  call will return a Promise that is resolved when all the Promises specified in all the
  wrapped components are resolved. For an example of this, see how the <Home> component loads its data.
*/
app.get('/*', (req, res) => {
  const memHistory = createHistory(req.originalUrl);
  const store = makeStore(memHistory);
  const history = syncHistoryWithStore(memHistory, store);
  const routes = createRoutes(store);

  match({ history, routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (err) {
      console.error('ROUTER ERROR:', error);
      res.status(500);
    } else if (renderProps) {
      loadOnServer({...renderProps, store})
      .then(() => {
        var html;
        try {
          html = renderToString(
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
        }
        catch(e) {
          html = '';
        }

        const head = Helmet.rewind();
        const title = head.title.toString();
        const meta = head.meta.toString();

        res.render('index', {html, title, meta, store});
      })
      .catch(err => console.log(err.stack));
    } else {
      res.status(404).send('Not found');
    }
  });

});

const server = require('http').createServer(app);
server.listen(process.env.port || 42000, process.env.IP || '0.0.0.0', function(err) {
  if (err) {
    console.log(err.stack);
  }
  else {
    console.log("Server listening on %j", server.address());
  }
});
