var mongoose = require('mongoose');

var disponibleSchema = new mongoose.Schema({
  id:String,
  descripcion: String
});
module.exports = mongoose.model('disponible', disponibleSchema);
