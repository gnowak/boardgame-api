// app/models/game.js

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var GameSchema  = new Schema({
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

module.exports = mongoose.model('Game', GameSchema);  