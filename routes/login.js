var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');


// Ruta para autenticarse con Twitter (enlace de login)
router.get('/', passport.authenticate('twitter'));


router.get('/twitter/return', 
  passport.authenticate('twitter', { failureRedirect: '/model' }),
  function(req, res) {
  	console.log(req.user);
    res.redirect('/');
  });




router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


module.exports = router;