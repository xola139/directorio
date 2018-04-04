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

/* GET SINGLE IMAGE BY ID */
router.get('/:id', function(req, res, next) {
  Images.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE IMAGE */
router.put('/:id', function(req, res, next) {
  Images.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.get('/profile',
  function(req, res){
    res.render('profile', { user: req.user });
  });




module.exports = router;