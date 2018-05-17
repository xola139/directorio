var mongoose = require('mongoose');

var disponibleSchema = new mongoose.Schema({
  id:String,
  status:Boolean,
  profile_image_url:String,
  disponibles: [{descripcion:String,ciudad:String, created_at:String}],
  fk_images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Images'}],
});


module.exports = mongoose.model('disponibles', disponibleSchema,'disponibles');

