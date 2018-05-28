var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Disponible = require('../models/Disponibles.js');
var Images = require('../models/Images.js');



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