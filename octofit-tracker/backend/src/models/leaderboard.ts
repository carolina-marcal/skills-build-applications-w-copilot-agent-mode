import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    position: { type: Number, default: 1 },
  },
  { timestamps: true },
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
