import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    focus: { type: String, default: 'Cardio' },
    durationMinutes: { type: Number, default: 40 },
    difficulty: { type: String, default: 'Moderate' },
  },
  { timestamps: true },
);

const Workout = model('Workout', workoutSchema);

export default Workout;
