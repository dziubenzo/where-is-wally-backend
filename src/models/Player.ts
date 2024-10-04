import mongoose from 'mongoose';
import { LevelType } from './Level';

export type PlayerType = {
  nickname: string;
  level: LevelType;
  start_date: Date;
  end_date: Date;
  duration: number;
  hints_used: Boolean;
};

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 16,
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'Level',
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  hints_used: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('Player', PlayerSchema);
