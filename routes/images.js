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

  console.log("evento con get en images");
  Images.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE IMAGE */
router.put('/:id', function(req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>evento con put en images");
   console.log(req.body);
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