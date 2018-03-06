var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var existencia = require('../models/Existencia.js');

/* GET ALL IMAGES */
router.get('/', function(req, res, next) {
    existencia.find(function (err, existencia) {
        console.log(existencia);
    if (err) return next(err);
    res.json(existencia);
  });
});

module.exports = router;