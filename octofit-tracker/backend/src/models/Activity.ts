import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, default: 'Workout' },
    durationMinutes: { type: Number, default: 30 },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Activity = model('Activity', activitySchema);

export default Activity;
