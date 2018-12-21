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

  var regex = new RegExp(req.params.game_name, 'i');
  
  GameCollection.find({username: regex}, function(err, collection) {  
    if (err)
    res.send(err);
    if (collection.length)
    res.status(200).send(collection);
    else {
      var collection = new GameCollection();
      axios.get(bggApiUrl + 'collections/?username=' + req.params.bgg_user_name)
      .then(function(response) {
        parseString(response.data, function(err, result){
          // const games = result.items.map(x => {});
          console.log(result.items.item);
        });
        res.status(200).send(result.items); 
      })
      .catch(function (error) {
        res.json({message: "Check username!"})
      });
    }
  });
});

module.exports = router;
