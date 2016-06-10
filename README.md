# DecodeMTL WordPress Frontend

This project is the front-end portion of DecodeMTL's site. It talks to a WordPress API and generates pages using a React-based stack.

## Overview of technologies

In no particular order, the front-end makes use of the following technologies. They have not only been chosen for their universality -- they do have to run on the browser and in Node -- but also for their excellence at doing what they do:

* [react](https://facebook.github.io/react/) for its awesome view library
* [react-router](https://github.com/reactjs/react-router) for URL-based routing
* [redux](http://redux.js.org/docs/introduction/) for managing the application's state
* [react-redux](https://github.com/reactjs/react-redux) for easily [connecting React components to Redux state](http://redux.js.org/docs/basics/UsageWithReact.html)
* [react-router-redux](https://github.com/reactjs/react-router-redux) for keeping track of the current URL in Redux state
* [redux-connect](https://github.com/makeomatic/redux-connect) for loading all initial data associated to a route
* [redux-thunk](https://github.com/gaearon/redux-thunk) for dispatching asynchronous operations through Redux
* [react-intl](https://github.com/yahoo/react-intl) for i18n in React components
* [react-helmet](https://github.com/nfl/react-helmet) to manage the <head> of the document
* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) for making HTTP requests with a Promise-based interface
* [express](http://expressjs.com/) to do the server-side rendering and support various middleware
* [ejs](http://www.embeddedjs.com/) to render the page on the server. Eventually this will be switched to React.
* [babel](https://babeljs.io/) for anything ES6-related. We use babel-register to run the server and babel-loader to transpile client code.
* [webpack](https://webpack.github.io/) for development with hot reloading, and bundling for production.

## TODO
- [x] Add webpack isomorphic tools or similar, to make reloading of components possible on the server.
- [ ] Figure out how to write the styles. I'm used to the idea of a separate SASS directory, but having the styles alongside the components makes sense.
- [x] Implement the blog, courses and pages components with their reducers and API calls.
- [ ] Implement the course application form with redux-form.
- [ ] Figure out the best place to hook to for URL changes, and send them to analytics.

## Files
Instead of writing everything in the README, each module has comments to describe what it does and how it interacts with the application. Here are the main files of the application:

* `/server.babel.js`: bootstraps the Express server.
* `/server.js`: Express server does route matching and server-side rendering.
* `/webpack.dev.config.js`: Webpack development configuration. A prod version will have to be created.
* `/src/js/api-client.js`: Uses `fetch` to make API calls to our WordPress instance.
* `/src/js/app.js`: bootstraps the client application.
* `/src/js/config.js`: shared client and server configuration variables.
* `/src/js/fr.js`: french translations.
* `/src/js/routes.js`: routes definition for client and server.
* `/src/js/redux/store.js`: Redux store generator.
* `/src/js/redux/modules/reducer.js`: composes all the app's reducers in a keyed reducer.
