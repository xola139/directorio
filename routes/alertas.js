var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Alertas = require('../models/Alertas.js');

/* GET ALL Alertas */
router.get('/', function(req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  Alertas.find(function (err, alertas) {
    if (err) return next(err);
    res.json(alertas);
  });
});



module.exports = router;