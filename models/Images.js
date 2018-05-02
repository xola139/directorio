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
  horarioAtencion:[{
    hinicio:Number,
    hfin:Number
  }],
  opcionesTelefono:[{
      whatsapp:Boolean,
      llamadas:Boolean}],
  idiomas:[{
      espanol:Boolean,
      ingles:Boolean}],
  images: [{
	  	url: String,
	  	fecha: String,
	  	status: String
	}]
});



module.exports = mongoose.model('Images', ImagesSchema);

