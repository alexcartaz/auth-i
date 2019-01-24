// import your node modules
const express = require('express');
const requireAll = require('require-all');
const session = require('express-session');

let _ = require('lodash'); // eslint-disable-line
const server = express();

const sessionConfig = {
  name: 'custom_name', // defailt is sid
  secret: 'anything123',
  cookie: {
    maxAge: 1000 * 60 * 10, // session expiration duration in ms
    secure: false, // only send cookie over https (true in prod, false in dev)
  },
  httpOnly: true, // makes it so js can't read it
  resave: false, // legal compliance
  saveUninitialized: false, // legal compliance
};

server.use(express.json());
server.use(
  session(sessionConfig),
);

// add your server code starting here
server.listen(5000, () => console.log('server running'));

process.setMaxListeners(0);

function protected(req, res, next) {
  console.log(req.session)
  // if the user is logged in next()
  if(req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({'message': 'Not authenticated.'});
  }
}

// session setup
// configure express-session middleware

const controllers = requireAll(__dirname + '/src/endpoints'); // eslint-disable-line
_.each(controllers, (endpoints, controller) => {
  _.each(endpoints, (definition, endpoint) => {
    console.log(`${endpoint}: /api/${controller}${definition.url}`);
    const args = [definition.handler];
    if (definition.protected) {
      args.unshift(protected);
    }
    args.unshift(`/api/${controller}${definition.url}`);
    server[definition.type.toLowerCase()].call(server, ...args); // note to self loop up js function call
  });
});
