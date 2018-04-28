 var mongoose = require('mongoose');

var ImagesSchema = new mongoose.Schema({
  id: String,
  avatar: String,
  telefono: String,
  nacionalidad: String,
  disponible: Boolean,
  idioma: String,
  horario: String,
  viajes: String,
  edad: Number,
  atiende:String,
  cuerpo:[
    {estatura: String,
    ojos: String,
    cabello: String,
    medidas: String,
    peso: String}
  ],
  images: [{
	  	url: String,
	  	fecha: String,
	  	status: String
	}],
  promos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Promos'}],
});

module.exports = mongoose.model('Images', ImagesSchema);

