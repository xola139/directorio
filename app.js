var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect('tu conexion aqui')
.then(() =>  console.log('connection successful'))
.catch((err) => console.error(err));
  
//var book = require('./routes/book');
var disponible = require('./routes/disponible');
var promos = require('./routes/promos');
var images = require('./routes/images');
var alertas = require('./routes/alertas');
var existencia = require('./routes/existencia');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

//app.use('/book', book);

app.use('/promos', promos);
app.use('/disponible', disponible);
app.use('/images', images);
app.use('/alertas', alertas);
app.use('/existencia', existencia);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;