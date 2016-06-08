import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './pages/App';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Courses from './pages/Courses';
import CoursePage from './pages/CoursePage';
import SinglePage from './pages/SinglePage';
import {switchLanguage} from './redux/modules/i18n';

/*
  Instead of directly defining our app routes, we have to export a function that receives the store.
  When creating routes, as we do in the app.js on the client and server.js on the server, we need
  access to the store in order to dispatch a switchLanguage action. At the moment, the router seems
  like the best place to do it, specifically in the onEnter hook.
*/
export default function createRoutes(store) {
  return (
    <Route path="/" component={App}>
      <Route path="fr" onEnter={() => store.dispatch(switchLanguage('fr'))}>
        <IndexRoute component={Home}/>
        <Route path="blogue" component={Blog} />
        <Route path="blogue/:slug" component={BlogPost} />
        <Route path="cours" component={Courses} />
        <Route path="cours/:slug" component={CoursePage} />
        <Route path=":slug" component={SinglePage} />
      </Route>
      <Route onEnter={() => store.dispatch(switchLanguage('en'))}>
        <IndexRoute component={Home}/>
        <Route path="blog" component={Blog} />
        <Route path="blog/:slug" component={BlogPost} />
        <Route path="courses" component={Courses} />
        <Route path="courses/:slug" component={CoursePage} />
        <Route path=":slug" component={SinglePage} />
      </Route>
    </Route>
  );
}
