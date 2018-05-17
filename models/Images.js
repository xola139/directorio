 var mongoose = require('mongoose');

var ImagesSchema = new mongoose.Schema({
  id: String,
  status:Boolean,
  avatar: String,
  descripcion:String,
  descripcionTwitter:Boolean,
  ciudad:String,
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
    peso: String}],
  horarioAtencion:[{
    fulltime:Boolean,
    hinicio:Number,
    hfin:Number
  }],
  opcionesTelefono:[{
      whatsapp:Boolean,
      llamadas:Boolean,
      twitter:Boolean}],
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

