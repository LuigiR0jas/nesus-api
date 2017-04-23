const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      path = require('path'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      config = require('./config.js'),
      port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
    Authorization');
    next();
});

app.use(morgan('dev'));

app.get('/', function(req, res){
  var ip = req.connection.remoteAddress;
  res.send('Hello! Your IP ('+ ip +') is being tracked now ;)')
  console.log(ip);
})

var apiRouter = express.Router();

apiRouter.use(function(req, res, next){
  console.log('Somebody hit the middleware...');
  next();
})

apiRouter.get('/', function(req, res){
  res.send('Nice, youre in the api');
})

app.use('/api', apiRouter);

app.listen(port)
console.log('SERVER RUNNING ON ', port);
