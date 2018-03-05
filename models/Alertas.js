var mongoose = require('mongoose');

var alertasSchema = new mongoose.Schema({
  id:String,
  descripcion: String,
  time: String,
  timems: String,
  idTwit: String,
  estatus: Boolean,
  timemsString: String,
  tipo: String,
  });
module.exports = mongoose.model('alertas', alertasSchema);