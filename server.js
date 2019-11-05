const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan')

const hubsRouter = require('./hubs/hubs-router.js');
const logger = require('./api/dateLogger-middleware');

const server = express();

// function dateLogger(req, res, next) {
//   console.log(new Date().toISOString());

//   next();
// }

function gateKeeper(req, res, next) {
  const password = req.headers.password || '';
if(password){
  if(password.toLowerCase() === 'mellon') {
    next();
  } else{
    res.status(401).json({ password: 'password was incorrect!!'});
  }
} else{
  res.status(400).json({ password: 'please provide a password in header...'});
  }
}

function doubler(req, res, next){
  const number = Number(req.query.number || 0);

  req.doubled = number * 2;
  next();
}

server.use(helmet());
server.use(express.json());
server.use(gateKeeper);
// server.use(dateLogger);
server.use(logger);
server.use(morgan('dev'));
server.use(doubler);

server.use('/api/hubs', doubler, hubsRouter);


server.get('/', doubler, (req, res) => {
  res.status(200).json({ number: req.doubled });
});

module.exports = server;
