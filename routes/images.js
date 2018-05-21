var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Images = require('../models/Images.js');
var Disponibles = require('../models/Disponibles.js');

/* GET ALL IMAGES */
//db.tweets.find( {_id : { "$lt" : <50th _id> } } ).limit(50).sort({"_id":-1});
router.get('/', function(req, res, next) {
  Images.find({status:true},function (err, images) {
    if (err) return next(err);
    res.json(images);
  });
});



/* SAVE BOOK */
router.put('/guardar', function(req, res) {
  
  Images.find({id:req.body.id},function(err,images){
      if(err)console.log(err);
      else{
          if(images.length > 0)
            res.json(images);
          else{
            Images.create(req.body, function (err, post) {
              if (err) console.log(err);
                Disponibles.findOne({id:req.body.id},function(err,disponible){
                if(err) console.log(err);
                
                var updateDisponible = disponible;
                updateDisponible.fk_images = post._id;
                delete updateDisponible._id;

                Disponibles.findByIdAndUpdate(disponible._id, updateDisponible, function (err, dispo) {
                  if (err) console.log(err);
                  console.log("Guardo referencia!!" + dispo);
                });

              });

              res.json(post);
            });
          }
          
      }
    
  });
});

/* GET SINGLE IMAGE BY ID */
router.get('/:id', function(req, res, next) {

  console.log("evento con get en images");
  Images.findOne({id:req.params.id}, function (err, post) {
//  Images.findById(req.params.id, function (err, post) {
    if (err) return next(err);

    if(post.opcionesTelefono == null){
      post.opcionesTelefono.push({"llamadas": false,"whatsapp": false});
    }
     if(post.idiomas == null){
      post.idiomas.push({"espanol": false,"ingles": false});
    } 
    if(post.horarioAtencion == null){
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