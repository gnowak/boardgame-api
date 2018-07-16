// app/models/GameCollection.js

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var Game  = new Schema({
  name: {type: String, required: true},
  name_lower: String,
  description: String,
  numPlayers: {
    min: Number,
    max: Number,
    recommended: Number 
  },
  yearPublished: Number,
  genre: [String],
  images: {
    main: String, thumbnail: String
  },
  expansionId: [Number],
  bggId: Number,
});

var GameCollectionSchema  = new Schema({
  username: String,
  games: [Game]
});

module.exports = mongoose.model('GameCollection', GameCollectionSchema);  