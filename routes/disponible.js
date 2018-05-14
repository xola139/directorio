var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Disponible = require('../models/Disponibles.js');

/* GET ALL DISPONIBLE */
router.get('/', function(req, res, next) {
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
          descripcion:disponible[it].disponibles[disponible[it].disponibles.length -1].descripcion}) ;
      }
	res.json(items);
  });
});


/*router.get('/', function(req, res, next) {
	
	Disponible.find().distinct('id', function(error, disponible) {
    	if (error) return next(err);
    	res.json(disponible);
	});
});*/

module.exports = router;