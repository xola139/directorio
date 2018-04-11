 var mongoose = require('mongoose');

var PromosSchema = new mongoose.Schema({
  id: String,
  descripcion: String,
  time: String,
  timems: String,
  idTwit: String,
  estatus: Boolean,
  timemsString: String,
  images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Images'}],
});

module.exports = mongoose.model('Promos', PromosSchema);
