 var mongoose = require('mongoose');

var ImagesSchema = new mongoose.Schema({
  id: String,
  images: Array,
  
});

module.exports = mongoose.model('Images', ImagesSchema);

