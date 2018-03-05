var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Images = require('../models/Images.js');

/* GET ALL IMAGES */
router.get('/', function(req, res, next) {
  Images.find(function (err, images) {
    if (err) return next(err);
    res.json(images);
  });
});

module.exports = router;