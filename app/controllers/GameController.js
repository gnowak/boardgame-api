//GameController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var axios = require('axios');
var parseString = require('xml2js').parseString;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Game = require('../models/Game');

var bggApi = 'https://www.boardgamegeek.com/xmlapi2/';


router.post('/', function(req,res){
  var game = new Game();
  game.name = req.body.name;
  game.name_lower = req.body.name.toLowerCase();
  game.description = req.body.description;
  game.numPlayers = req.body.numPlayers;
  game.yearPublished = req.body.yearPublished;
  game.genre = req.body.genre;

  game.save(function(err){
    if(err)
      res.send(err);

    res.json({message: "Game Created"});
  });
});
router.get('/', function(req, res) {
  Game.find(function(err, games) {
      if (err)
        res.send(err);
      if (games.length)
        res.status(200).send(games);
      else res.send("Could not find any games")
  });
});
router.get('/:game_name', function(req, res){
  var regex = new RegExp(req.params.game_name, 'i');
  console.log();
  Game.find({
    name_lower: regex
  }, function(err, game){
    if(err)
      res.status(500).send(err);
    if(game.length)
      res.status(200).send(game);
    else res.json({message:"Check the game name and search again!"});
  });
});

/*
router.route('/games/:game_name')
  .put(function(req, res){
    Game.findBy(req.params.game_name, function(err, game){
      if(err)
        res.send(err);
      game.name = req.body.name;

      game.save(function(err) {
        if(err)
          res.send(err);
        res.json({message: "Game Updated!"});
      });
    });
  })
  .delete(function(req, res){
    Game.remove({
      _id: req.params.game_name
    }, function(err, game) {
      if(err)
        res.send(err);
      res.json({message: "Successfully Deleted!"});
    });
  });
*/

module.exports = router;
