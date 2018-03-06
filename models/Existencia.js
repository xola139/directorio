var mongoose = require('mongoose');

var existenciaSchema = new mongoose.Schema({
    albumId: Number,
    id: Number,
    title: String,
    url: String,
    thumbnailUrl: String,
  });

module.exports = mongoose.model('existencia', existenciaSchema,'existencia');


