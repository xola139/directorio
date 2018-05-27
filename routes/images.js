var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Images = require('../models/Images.js');
var Disponibles = require('../models/Disponibles.js');
var config  = require('../config');

var Twit = require('twit');

var Bot = new Twit({
        consumer_key: config.twitter.key,
        consumer_secret: config.twitter.secret,
        access_token: config.twitter.TWITTER_ACCESS_TOKEN,
        access_token_secret: config.twitter.TWITTER_ACCESS_TOKEN_SECRET
});


/* GET ALL IMAGES */
//db.tweets.find( {_id : { "$lt" : <50th _id> } } ).limit(50).sort({"_id":-1});
router.get('/', function(req, res, next) {
  Images.find({status:true},function (err, images) {
    if (err) return next(err);
    res.json(images);
  });
});

router.get('/getMostrarEnDispoibles', function(req, res, next) {
  Images.find({status:true},function (err, images) {
    if (err) return next(err);
    var items = [];
    console.log("Entrando----->");
    for(var i=0;i<images.length;i++){
       console.log("Iteraciono----->");
       var item = {};
       item.ciudad = images[i].ciudad;
       item.created_at = new Date();
       item.descripcion = images[i].descripcion;
       item.id = images[i].id;
       item.profile_image_url = images[i].avatar;
       item.telefono = images[i].telefono;
       items.images = images[i].images;
       items.push(item);
       
    }
    res.json(items);
  });
});

router.put('/registrar', function(req, res) {
    var options = { screen_name: req.body.id,count:100};
      
    Bot.get('statuses/user_timeline', options , function(err, data) {
        var newMedia = {};
        var arrImage = [];

        newMedia.id = data[0].user.screen_name;
        newMedia.id_str = data[0].id;
        newMedia.description= data[0].text,
        newMedia.profile_image_url = data[0].user.profile_image_url;
        newMedia.profile_image_url_https = data[0].user.profile_image_url_https.replace("_normal.jpg","_400x400.jpg");
        newMedia.diasAtencion = {lunes:false,martes:false,miercoles:false,jueves:false,viernes:false,sabado:false,domingo:false,fulltime:false};
        newMedia.opcionesTelefono = {whatsapp:false,llamadas:false,twitter:false};        
        newMedia.idiomas = {espanol:false,ingles:false};        
        newMedia.horarioAtencion = {hinicio:0,hfin:0,fulltime:false};        
        newMedia.cuerpo = {estatura:'',ojos:'',cabello:'',medidas:'',peso: ''};
      



        for(var i=0;i<data.length;i++){
            if(data[i].entities.media){
                var _m = data[i].entities.media;
                for(var x=0;x<_m.length;x++){
                    delete _m[x].indices;
                    delete _m[x].sizes;
                    _m[x].status = "foto";
                    arrImage.push(_m[x]);
                }    
            }
        }
        
        newMedia.images = arrImage;
        Images.create(newMedia, function (err, post) {
            if (err)  console.log(err);
                console.log("save register Images "+post.id);
                res.json(post);
        });

    })

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