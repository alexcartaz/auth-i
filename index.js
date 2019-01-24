// import your node modules
const express = require('express');
const requireAll = require('require-all');
const session = require('express-session');
let _ = require('lodash'); // eslint-disable-line

const server = express();

server.use(express.json());

// add your server code starting here
server.listen(5000, () => console.log('server running'));

process.setMaxListeners(0);

// session setup
// configure express-session middleware
server.use(
  session({
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies.
    // Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
  }),
);

const controllers = requireAll(__dirname + '/src/endpoints'); // eslint-disable-line
_.each(controllers, (endpoints, controller) => {
  _.each(endpoints, (definition, endpoint) => {
    console.log(`${endpoint}: /api/${controller}${definition.url}`);
    server[definition.type.toLowerCase()](
      `/api/${controller}${definition.url}`,
      definition.handler,
    );
  });
});
