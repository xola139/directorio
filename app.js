var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.Promise = global.Promise;

// Importamos el modelo usuario y la configuración de passport
require('./models/user');
require('./passport')(passport);


mongoose.connect('tu conexion a mongolab')
.then(() =>  console.log('connection successful'))
.catch((err) => console.error(err));
  
//var book = require('./routes/book');
var disponible = require('./routes/disponible');
var promos = require('./routes/promos');
var images = require('./routes/images');
var alertas = require('./routes/alertas');




var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

// Configuración de Passport. Lo inicializamos
// y le indicamos que Passport maneje la Sesión
app.use(passport.initialize());
app.use(passport.session());


//app.use('/book', book);

app.use('/promos', promos);
app.use('/disponible', disponible);
app.use('/images', images);
app.use('/alertas', alertas);

// Ruta para autenticarse con Twitter (enlace de login)
app.get('/auth/twitter', passport.authenticate('twitter'));



// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/login' }
));

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