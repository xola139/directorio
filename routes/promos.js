var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Promos = require('../models/Promos.js');

/* GET ALL PROMOSS */
router.get('/',

	function(req, res, next) {
	
	  res.setHeader('Access-Control-Allow-Origin', '*');
	  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
	  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
	  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

	  Promos.find(function (err, promos) {
	  	console.log("########################>"+req.user );
	    if (err) return next(err);
	    res.json(promos);
	  });
});



module.exports = router;