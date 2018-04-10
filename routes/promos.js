var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Promos = require('../models/Promos.js');
var Images = require('../models/Images.js');

/* GET ALL PROMOSS */
router.get('/',

	function(req, res, next) {
	
	  res.setHeader('Access-Control-Allow-Origin', '*');
	  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
	  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
	  res.setHeader('Access-Control-Allow-Credentials', true); // If needed


//	  Promos.find().forEach( function(myDoc) { console.log( "user: " + myDoc); } );

	  Promos.find(function (err, promos) {
	  	

	  	promos.forEach(function(u) {
		    console.log("########################>"+u.id );
		    // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
			Images.findOne({ 'id': u.id }, 'telefono', function (err, imagen) {
			  if (err) return handleError(err);
			  
			  console.log(imagen);
			});

		});


	    if (err) return next(err);
	    res.json(promos);
	  });l
});



module.exports = router;