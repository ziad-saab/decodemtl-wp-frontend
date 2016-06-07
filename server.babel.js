/*
  This is the entry point for the server side of our application.
  It uses babel-register to hook to the require function, then immediately uses it to require the server.
*/
require('babel-register');
require('./server');
