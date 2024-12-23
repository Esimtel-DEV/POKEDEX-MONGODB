const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: [{
    type: String,
    required: true
  }],
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  abilities: [{
    type: String,
    required: true
  }],
  stats: {
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    speed: { type: Number, required: true }
  }
}, { timestamps: true });

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;