 var mongoose = require('mongoose');

var ImagesSchema = new mongoose.Schema({
  
  id: String,
  id_str:String,
  accountbackup:String,
  description:String,
  descripcionTwitter:Boolean,
  profile_image_url:String,
  profile_image_url_https: String,
  validado:Boolean,
  status:Boolean,
  disponible: Boolean,
  onlytwit:Boolean,
  autPost:Boolean,
  ciudad:String,
  telefono: String,
  nacionalidad: String,
  
  idioma: String,
  horario: String,
  viajes: String,
  edad: Number,
  atiende:String,
  calendario:String,
  cuerpo:{
    estatura: String,
    ojos: String,
    cabello: String,
    medidas: String,
    peso: String
  },
  horarioAtencion:{
    fulltime:Boolean,
    hinicio:Number,
    hfin:Number
  },
  diasAtencion:{
    fulltime:Boolean,
    lunes:Boolean,
    martes:Boolean,
    miercoles:Boolean,
    jueves:Boolean,
    viernes:Boolean,
    sabado:Boolean,
    domingo:Boolean,
  },
  pago:{
    tarjeta:Boolean,
    efectivo:Boolean
  },
  opcionesTelefono:{
      whatsapp:Boolean,
      whatsappdirecto:Boolean,
      llamadas:Boolean,
      twitter:Boolean

      },
  idiomas:{
      espanol:Boolean,
      ingles:Boolean},
  images: Array,
  posttwitter: Array
  
});



module.exports = mongoose.model('Images', ImagesSchema);

