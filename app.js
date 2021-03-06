var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var cors = require('cors');

var config  = require('./config');

mongoose.Promise = global.Promise;
var Strategy = require('passport-twitter').Strategy;
// Configure the Twitter strategy for use by Passport.
//https://flamingtext.com/logo/Design-Beauty
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    consumerKey: config.twitter.key,//process.env.CONSUMER_KEY,
    consumerSecret: config.twitter.secret,//,process.env.CONSUMER_SECRET,
    callbackURL: '/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



mongoose.connect(config.conectDB.link)
.then(() =>  console.log('connection successful'))
.catch((err) => console.error(err));
  
var book = require('./routes/book');
var disponible = require('./routes/disponible');
var promos = require('./routes/promos');
var images = require('./routes/images');
var alertas = require('./routes/alertas');
var login = require('./routes/login');
var messages = require('./routes/messages');


var app = express();

//enabled cors
app.use(cors())
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

//app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

   next();
});

app.put('/guardando', function (req, res) {
  console.log('PUT request to homepage');
});

/*Service REST all */
//app.use('/promos', require('connect-ensure-login').ensureLoggedIn(),promos);
app.use('/book', book);
app.use('/promos',promos);
app.use('/disponible', disponible);
app.use('/images', images);
app.use('/alertas', alertas);
app.use('/login', login);
app.use('/messages', messages);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log(err);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});






// error handler
app.use(function(err, req, res, next) {

  console.log(err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;