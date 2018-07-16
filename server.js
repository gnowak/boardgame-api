// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var axios      = require('axios');

var db                  = require('./app/config/db.js');
var GameController      = require('./app/controllers/GameController');
var GameCollectionController      = require('./app/controllers/GameCollectionController');

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



// REGISTER OUR ROUTES -------------------------------

app.use('/api/games', GameController);
app.use('/api/gamecollections', GameCollectionController);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
