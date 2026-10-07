import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    await User.insertMany([
      { name: 'Mona', email: 'mona@example.com', username: 'mona', level: 5, fitnessGoal: 'Run a 10K' },
      { name: 'Ravi', email: 'ravi@example.com', username: 'ravi', level: 4, fitnessGoal: 'Build strength' },
      { name: 'Avery', email: 'avery@example.com', username: 'avery', level: 3, fitnessGoal: 'Improve mobility' },
    ]);

    await Team.insertMany([
      { name: 'Velocity', captain: 'Mona', members: ['Mona', 'Ravi'], goal: 'Weekly distance challenge' },
      { name: 'Momentum', captain: 'Avery', members: ['Avery', 'Kai'], goal: 'Strength and stability' },
    ]);

    await Activity.insertMany([
      { name: 'Morning Run', type: 'Cardio', durationMinutes: 35, caloriesBurned: 420, date: new Date() },
      { name: 'Cycle Sprint', type: 'Cardio', durationMinutes: 28, caloriesBurned: 390, date: new Date() },
    ]);

    await Leaderboard.insertMany([
      { name: 'Mona', score: 980, streak: 8, position: 1 },
      { name: 'Ravi', score: 930, streak: 5, position: 2 },
      { name: 'Avery', score: 890, streak: 4, position: 3 },
    ]);

    await Workout.insertMany([
      { name: 'HIIT Burn', focus: 'Cardio', durationMinutes: 25, difficulty: 'High' },
      { name: 'Strength Flow', focus: 'Strength', durationMinutes: 40, difficulty: 'Moderate' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
