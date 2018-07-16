//GameController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var axios = require('axios');
var parseString = require('xml2js').parseString;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var GameCollection = require('../models/GameCollection');

var bggApiUrl = 'https://www.boardgamegeek.com/xmlapi2/'; 

router.get('/:bgg_user_name', function(req, res){

  var collection = new GameCollection();

  var regex = new RegExp(req.params.game_name, 'i');
  var textJunk = '';

  GameCollection.find({username: regex}, function(err, collection) {

    if (err)
      res.send(err);
    if (collection.length)
      res.status(200).send(collection);
    else {
      axios.get(bggApiUrl + 'collections/?username=' + req.params.bgg_user_name)
      .then(function(response) {
        
        parseString(response.data, function(err, result){
          console.log(result);
          textJunk = result;
        });
        res.status(200).send(textJunk); 
      })
      .catch(function (error) {
        res.json({message: "Check username!"})
      });
    }
});
    
  // var regex = new RegExp(req.params.bgg_user_name, 'i');
  
  // GameCollection.find({
  //   name_lower: regex
  // }, function(err, gameCollection){
  //   if(err)
  //     res.status(500).send(err);
  //   if(game.length)
  //     res.status(200).send(gameCollection);
  //   else {
  //   };
  // });
});

module.exports = router;
