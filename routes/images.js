var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Images = require('../models/Images.js');

/* GET ALL IMAGES */
//db.tweets.find( {_id : { "$lt" : <50th _id> } } ).limit(50).sort({"_id":-1});
router.get('/', function(req, res, next) {
  Images.find({status:true},function (err, images) {
    if (err) return next(err);
    res.json(images);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  
  Images.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE IMAGE BY ID */
router.get('/:id', function(req, res, next) {

  console.log("evento con get en images");
  Images.findById(req.params.id, function (err, post) {
    if (err) return next(err);

    if(post.opcionesTelefono.length == 0){
      post.opcionesTelefono.push({"llamadas": false,"whatsapp": false});
    }
     if(post.idiomas.length == 0){
      post.idiomas.push({"espanol": false,"ingles": false});
    } 
    if(post.horarioAtencion.length == 0){
      post.horarioAtencion.push({"hinicio": 0,"hfin": 0});
    } 


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