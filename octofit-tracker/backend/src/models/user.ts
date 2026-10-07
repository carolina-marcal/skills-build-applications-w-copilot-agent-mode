import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    level: { type: Number, default: 1 },
    fitnessGoal: { type: String, default: 'Improve endurance' },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
