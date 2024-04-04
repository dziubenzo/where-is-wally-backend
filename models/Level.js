const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  url_parameter: {
    type: Number,
    min: 1,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 16,
    unique: true,
  },
  image_url: {
    type: String,
    required: true,
    unique: true,
  },
  characters: {
    wally: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    wenda: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    wizard: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    odlaw: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
});

module.exports = mongoose.model('Level', LevelSchema);
