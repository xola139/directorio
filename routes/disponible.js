var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Disponible = require('../models/Disponibles.js');
var Images = require('../models/Images.js');
var config  = require('../config');


var Twit = require('twit');

var Bot = new Twit({
        consumer_key: config.twitter.key,
        consumer_secret: config.twitter.secret,
        access_token: config.twitter.TWITTER_ACCESS_TOKEN,
        access_token_secret: config.twitter.TWITTER_ACCESS_TOKEN_SECRET
});


/* GET ALL DISPONIBLE */
router.get('/',
    function(req, res, next) {
        var items = [];
        Images.find({
            status: true
        }, function(err, images) {
            if (err) return next(err);

            for (var i = 0; i < images.length; i++) {
                var item = {};
                item.ciudad = images[i].ciudad;
                item.created_at = new Date();
                item.descripcion = images[i].description;
                item.id = images[i].id;
                item.profile_image_url = images[i].profile_image_url_https;
                item.telefono = images[i].telefono;
                item.opcionesTelefono = images[i].opcionesTelefono;
                item.images = images[i].images;
                item.vip = true;
                item.from = 'disponible';
                items.push(item);



            }
 
            Disponible.find({
                status: true
            }).populate({
                path: 'fk_images',
                model: 'Images'
            }).exec(function(err, disponible) {
                if (err) {
                    return console.log(err);
                }

                for (var it = 0; it < disponible.length; it++) {
                    var ciudad = "";
                    for (var ci = 0; ci < disponible[it].disponibles.length; ci++) {
                        if (disponible[it].disponibles[ci].ciudad != "" && ciudad == "") {
                            ciudad = disponible[it].disponibles[ci].ciudad;
                            break;
                        }
                    }
                    var telefono = null;
                    if (disponible[it].fk_images[0] != null)
                        telefono = disponible[it].fk_images[0].telefono;

                    items.push({
                        id: disponible[it].id,
                        profile_image_url: disponible[it].profile_image_url,
                        ciudad: ciudad,
                        telefono: telefono,
                        descripcion: disponible[it].disponibles[disponible[it].disponibles.length - 1].descripcion,
                        created_at: disponible[it].disponibles[disponible[it].disponibles.length - 1].created_at
                    });
                }

                res.json(items);
            });



        });




    });

/*Servira para traer la modelo cuando no este registrada en disponibles
La idea es generar un post en twitter apartir de la vista  en timeline del usuario admin*/
router.get('/noVip/:id', function(req, res) {
    var options = { screen_name: req.params.id ,count:50};
      
    Bot.get('statuses/user_timeline', options , function(err, data) {
        var newMedia = {};
        var arrImage = [];


        newMedia.id = data[0].user.screen_name;
        newMedia.text = data[0].text +" \n"+ data[1].text;;
        newMedia.created_at = data[0].created_at;
        
        for(var i=0;i<data.length;i++){
            if(data[i].entities.media){
                var _m = data[i].entities.media;
                for(var x=0;x<_m.length;x++){
                    delete _m[x].indices;
                    delete _m[x].sizes;
                    delete _m[x].id;
                    delete _m[x].id_str;
                    delete _m[x].media_url;
                    //delete _m[x].media_url_https;
                    delete _m[x].url;
                    //delete _m[x].display_url;
                    delete _m[x].type;
                    delete _m[x].source_status_id;
                    delete _m[x].source_status_id_str;
                    delete _m[x].source_user_id;
                    delete _m[x].source_user_id_str;
                    delete _m[x].status;

                    arrImage.push(_m[x]);
                }    
            }
        }
        newMedia.images = arrImage;
          
        res.json(newMedia);
    })

});



/* GET ALL DISPONIBLE */
/*router.get('/', function(req, res, next) {
  Disponible.find({status:true},function (err,disponible) {
    if (err) return next(err);

 var items = [];
  for(var it=0 ;it<disponible.length;it++){
          var ciudad ="";
          for(var ci=0;ci<disponible[it].disponibles.length;ci++){
          if(disponible[it].disponibles[ci].ciudad != "" && ciudad ==""){
                ciudad = disponible[it].disponibles[ci].ciudad;
                break;
              }
          }

        items.push({
          id:disponible[it].id,
          profile_image_url:disponible[it].profile_image_url,
          ciudad:ciudad,
          descripcion:disponible[it].disponibles[disponible[it].disponibles.length -1].descripcion,
          created_at:disponible[it].disponibles[disponible[it].disponibles.length -1].created_at}
          );
                }
  res.json(disponible);
  });
});
*/

/*router.get('/', function(req, res, next) {
  
  Disponible.find().distinct('id', function(error, disponible) {
      if (error) return next(err);
      res.json(disponible);
  });
});*/

module.exports = router;