import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    captain: { type: String, default: '' },
    members: [{ type: String }],
    goal: { type: String, default: 'Build community fitness' },
  },
  { timestamps: true },
);

const Team = model('Team', teamSchema);

export default Team;
