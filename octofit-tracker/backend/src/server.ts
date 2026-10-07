import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';

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

function createResourceHandler(resource: string, model: any) {
  return async (_request: express.Request, response: express.Response) => {
    try {
      const records = await model.find({}).lean();
      response.json(records);
    } catch (error) {
      response.status(500).json({
        message: `Unable to load ${resource}`,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}

app.get('/api/users/', createResourceHandler('users', User));
app.get('/api/teams/', createResourceHandler('teams', Team));
app.get('/api/activities/', createResourceHandler('activities', Activity));
app.get('/api/leaderboard/', createResourceHandler('leaderboard', Leaderboard));
app.get('/api/workouts/', createResourceHandler('workouts', Workout));

app.get('/', (_request, response) => {
  response.json({
    app: 'Octofit Tracker',
    apiBase: baseUrl,
    resources: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
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
