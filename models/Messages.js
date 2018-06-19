  var mongoose = require('mongoose');

var MessagesSchema = new mongoose.Schema({
    message:String,
    status: Boolean,
    auxuse: Boolean
});

module.exports = mongoose.model('Messages', MessagesSchema);
