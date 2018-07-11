// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var axios      = require('axios');

var Game       = require('./app/models/Game');

mongoose.connect('mongodb://helios:8A2E5nWkoOj2@ds233531.mlab.com:33531/boardgame-api')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var apiUrl = "https://www.boardgamegeek.com/xmlapi2/";

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// more routes for our API will happen here

router.use(function(req, res, next){
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res){
  res.json({ message: 'Hooray! Welcome to our API!'});
});

router.route('/games')

  .post(function(req,res){
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
  })
  .get(function(req, res) {
    Game.find(function(err, games) {
        if (err)
            res.send(err);
        if (games)
        res.json(games);
    });
});

router.route('/games/:game_name')
.get(function(req, res){
  var regex = new RegExp(req.params.game_name, 'i');
    console.log();
    Game.find({
      name_lower: regex
    }, function(err, game){
      if(err)
        res.send(err);
      if(game.length)
        res.json(game);
      else res.json({message:"Check the game name and search again!"});
    });
  })
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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
