var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Promos = require('../models/Promos.js');
var Disponible = require('../models/Disponible.js');


/* GET ALL PROMOSS */
/*router.get('/',
	function(req, res, next) {
		Promos.find().populate('images','telefono').exec(function(err, promos) {
    	if (err) throw err;
 	res.json(promos);
    });
});*/

router.get('/',
	function(req, res, next) {
		Promos.find(function(err, promos) {
    	if (err) throw err;
 	res.json(promos);
    });
})




/* GET ALL DISPONIBLES */
router.get('/disponibles', function(req, res, next) {
  Disponible.find(function (err,disponible) {
    if (err) return next(err);
    res.json(disponible);
  });
});


module.exports = router;