var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Images = require('../models/Images.js');
var Disponibles = require('../models/Disponibles.js');
var config = require('../config');
var _ = require('underscore');
var Twit = require('twit');

var Bot = new Twit({
    consumer_key: config.twitter.key,
    consumer_secret: config.twitter.secret,
    access_token: config.twitter.TWITTER_ACCESS_TOKEN,
    access_token_secret: config.twitter.TWITTER_ACCESS_TOKEN_SECRET
});



/* GET ALL DEFAULT */
router.get('/', function(req, res, next) {
    Images.find( {}, null, {sort: {autPost: -1}},function(err, images) {
        if (err) return next(err);

        for (var i = 0; i < images.length; i++) {
            images.images = _.sortBy(images.images, function(o) { return o.id; })
        }

        res.json(images);
    });
});

/* DELETE POST  TWITTER */
router.delete('/deletePostTwitter/:id', function(req, res, next) {
  console.log(req.params.id);
    Bot.post('statuses/destroy/:id', { id: req.params.id }, function(err, data, response) {
        if(err)console.log(err);

        res.json(response);
    });

});





/* GET ALL IMAGES */
router.get('/by/:id', function(req, res, next) {
    var items = [];
    var firts = [];
    var resul;
    Images.find({$and:[{$or: [{validado: true  },  {status: true}]},{disponible: true}]},
        null,{sort: {validado: -1,status: -1}}, function(err, images) {
        if (err) return next(err);

        for (var i = 0; i < images.length; i++) {
            if( i >= 9)
             images[i].images = []; 

            if (req.params.id == images[i].id) {
                firts.push(images[i]);
            } else {
                items.push(images[i]);
            }
        }

        if (firts.length >= 0) {
            resul = firts.concat(items);
        } else
            resul = items;

        res.json(resul);
    });
});

router.get('/:id', function(req, res, next) {

    var _theid;
    console.log("consooolasooooo....11111"+req.params.id);

    
    //TODO:Validar y colocar roles en usuarios
    //se valida si es usuaruio admin para intercambiar el id que se requiere
    if(req.user == undefined){
        _theid = req.params.id
    }else if(req.user.username == '')
        _theid = req.params.id

    Images.findOne( {$and: [
    {id: _theid},
    {status: true}
    ]}, function(err, post) {
        
        if (err) return next(err);

        
        res.json(post);
    });
    
});


router.get('/getMostrarEnDispoibles', function(req, res, next) {
    Images.find({
        status: true
    }, function(err, images) {
        if (err) return next(err);
        var items = [];
        for (var i = 0; i < images.length; i++) {
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
    var options = {
        screen_name: req.body.id,
        count: 100
    };

    registraNuevo(options,res);

});

function registraNuevo(options,res){
    Bot.get('statuses/user_timeline', options, function(err, data) {
        var newMedia = {};
        var arrImage = [];

        newMedia.id = data[0].user.screen_name;
        newMedia.id_str = data[0].id;
        newMedia.description = data[0].user.description,
        newMedia.profile_image_url = data[0].user.profile_image_url.replace("_normal", "");;
        newMedia.profile_image_url_https = data[0].user.profile_image_url_https.replace("_normal", "");
        newMedia.diasAtencion = {
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            domingo: false,
            fulltime: false
        };
        newMedia.pago = {
            tarjeta:false,
            efectivo:false
        };
        newMedia.opcionesTelefono = {
            whatsapp: false,
            llamadas: false,
            twitter: true
        };
        newMedia.idiomas = {
            espanol: false,
            ingles: false
        };
        newMedia.horarioAtencion = {
            hinicio: 0,
            hfin: 0,
            fulltime: false
        };
        newMedia.cuerpo = {
            estatura: '',
            ojos: '',
            cabello: '',
            medidas: '',
            peso: ''
        };
        newMedia.status = true;
        newMedia.disponible = true;
        newMedia.ciudad = options.ciudad;

        for (var i = 0; i < data.length; i++) {
            if (data[i].entities.media) {
                var _m = data[i].entities.media;
                for (var x = 0; x < _m.length; x++) {
                    delete _m[x].indices;
                    delete _m[x].sizes;
                    _m[x].status = "foto";
                    arrImage.push(_m[x]);
                }
            }
        }
console.log("tratando de insertar....");
        //removemos el item temporal
        Images.remove({
            id: newMedia.id
        }, function(err, _) {
            if (err) console.log(err)

            newMedia.images = arrImage;
            Images.create(newMedia, function(err, post) {
                if (err) console.log(err);
                console.log("save register Images " + post.id);
                res.json(post);
            });

            var query = {
                'id': newMedia.id
            };
            var _status = {
                status: false
            };
            Disponibles.findOneAndUpdate(query, _status, {
                upsert: true
            }, function(err, doc) {
                if (err) console.log(err);
                console.log("succesfully update status Disponibles " + newMedia.id);
            });

        });
    })
}


/* UPDATE Autoriza post */
router.put('/autPost', function(req, res, next) {

    var _id = req.body._id;
    delete req.body._id;

    Images.findByIdAndUpdate({
        _id: _id
    }, req.body, function(err, image) {
        if (err) console.log(err);
        console.log("Update aut Post!!");
    })
});


/* UPDATE User */
router.put('/enableUser', function(req, res, next) {

    var _id = req.body._id;
    delete req.body._id;

    Images.findByIdAndUpdate({
        _id: _id
    }, req.body, function(err, image) {
        if (err) console.log(err);
        console.log("Update enable User!!");
    })
});



/* SAVE BOOK */
router.put('/guardar', function(req, res) {

    console.log("==============>");

    Images.find({
        id: req.body.id
    }, function(err, images) {
        if (err) console.log(err);
        else {
            if (images.length > 0)
                res.json(images);
            else {
                Images.create(req.body, function(err, post) {
                    if (err) console.log(err);
                    Disponibles.findOne({
                        id: req.body.id
                    }, function(err, disponible) {
                        if (err) console.log(err);

                        var updateDisponible = disponible;
                        updateDisponible.fk_images = post._id;
                        delete updateDisponible._id;

                        Disponibles.findByIdAndUpdate(disponible._id, updateDisponible, function(err, dispo) {
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
//require('connect-ensure-login').ensureLoggedIn()
//require('connect-ensure-login').ensureLoggedIn()





/* UPDATE IMAGE */
//router.put('/:id',require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
router.put('/:id', function(req, res, next) {

    //console.log(req.user.username);
    Images.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
            
        res.json(post);
    });
});


//update data
router.post('/:id', function(req, res, next) {
    var _theid = req.params.id;
    console.log(req.body)
    Images.findOne({
        id: _theid
        }, function(err, images) {
            if (err) console.log(err);
            else {
               if(images != null){
                    var _id = images._id;
                    delete images._id;
                    images.disponible = true;
                    Images.findByIdAndUpdate(images._id, images, function(err, post) {
                        if (err) return next(err);
                            
                        res.json(post);
                    });
               }else{
                console.log("##########No existe pero se quiere insertar###########");
                    var options = {
                        screen_name: _theid,
                        count: 100,
                        ciudad:req.body.ciudad
                    };

                    registraNuevo(options,res);
               } 
                
            }
    });
});



router.get('/profile',
    function(req, res) {
        res.render('profile', {
            user: req.user
        });
    });




module.exports = router;