var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Disponible = require('../models/Disponibles.js');

/* GET ALL DISPONIBLE */
router.get('/', function(req, res, next) {
  Disponible.find(function (err,disponible) {
    if (err) return next(err);
    res.json(disponible);
  });
});


/*router.get('/', function(req, res, next) {
	
	Disponible.find().distinct('id', function(error, disponible) {
    	if (error) return next(err);
    	res.json(disponible);
	});
});*/

module.exports = router;