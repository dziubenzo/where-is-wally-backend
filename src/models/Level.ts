import mongoose from 'mongoose';

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
  characters: [
    {
      name: { type: String, required: true },
      x: { type: Number, min: 0, max: 100, required: true },
      y: { type: Number, min: 0, max: 100, required: true },
    },
    {
      name: { type: String, required: true },
      x: { type: Number, min: 0, max: 100, required: true },
      y: { type: Number, min: 0, max: 100, required: true },
    },
    {
      name: { type: String, required: true },
      x: { type: Number, min: 0, max: 100, required: true },
      y: { type: Number, min: 0, max: 100, required: true },
    },
    {
      name: { type: String, required: true },
      x: { type: Number, min: 0, max: 100, required: true },
      y: { type: Number, min: 0, max: 100, required: true },
    },
  ],
});

export default mongoose.model('Level', LevelSchema);
