 var mongoose = require('mongoose');

var ImagesSchema = new mongoose.Schema({
  id: String,
  avatar: String,
  telefono: String,
  nacionalidad: String,
  images: Array,
  
  
});

module.exports = mongoose.model('Images', ImagesSchema);

