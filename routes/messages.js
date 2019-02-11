var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Messages = require('../models/Messages.js');
var config  = require('../config');



/* UPDATE Autoriza post */
router.put('/register', function(req, res, next) {
	console.log(req.body.message)
  var newMessage = {message: req.body.message,status: true,auxuse: true};
  
  Messages.create(newMessage, function (err, post) {
      if (err)  console.log(err);
          console.log("save register Messages ");
          res.json(post);
  });

});

router.get('/getMessages', function(req, res, next) {
  Messages.find({status: true },null,{sort: {id: -1}}, function(err, messages) {
      res.json(messages);
  })
});





module.exports = router;