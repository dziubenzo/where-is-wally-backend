const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  url_parameter: {
    type: Number,
    min: 1,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 16,
  },
  image_url: {
    type: String,
    required: true,
  },
  characters: {
    wally: {
      x: { type: Number, min: 0, max: 100, required: true },
      y: { type: Number, min: 0, max: 100, required: true },
    },
    wenda: {
      x: { type: Number, min: 0, max: 100, required: true },
      y: { type: Number, min: 0, max: 100, required: true },
    },
    wizard: {
      x: { type: Number, min: 0, max: 100, required: true },
      y: { type: Number, min: 0, max: 100, required: true },
    },
    odlaw: {
      x: { type: Number, min: 0, max: 100, required: true },
      y: { type: Number, min: 0, max: 100, required: true },
    },
  },
});

module.exports = mongoose.model('Level', LevelSchema);
