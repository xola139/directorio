var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');


// Ruta para autenticarse con Twitter (enlace de login)
router.get('/', passport.authenticate('twitter'));


	// route for twitter authentication and login
	// different scopes while logging in
router.get('/login/twitter', 
	passport.authenticate('twitter'));






// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/model' }
));



module.exports = router;