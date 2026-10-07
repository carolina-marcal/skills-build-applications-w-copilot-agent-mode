import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? (codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173');

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    api: baseUrl,
    database: 'unknown',
  });
});

const resourceHandlers: Array<[string, any]> = [
  ['users', User],
  ['teams', Team],
  ['activities', Activity],
  ['leaderboard', Leaderboard],
  ['workouts', Workout],
];

for (const [resource, model] of resourceHandlers) {
  app.get(`/api/${resource}/`, async (_request, response) => {
    try {
      const records = await model.find({}).lean();
      response.json(records);
    } catch (error) {
      response.status(500).json({
        message: `Unable to load ${resource}`,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}

app.get('/', (_request, response) => {
  response.json({
    app: 'Octofit Tracker',
    apiBase: baseUrl,
    resources: resourceHandlers.map(([resource]) => `/api/${resource}/`),
  });
});

export async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Octofit API listening on port ${port}`);
    });
    return app;
  } catch (error) {
    console.error('Failed to start Octofit API:', error);
    process.exit(1);
  }
}

export { baseUrl };
export default app;
