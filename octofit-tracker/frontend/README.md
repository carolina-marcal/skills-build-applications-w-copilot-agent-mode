# Octofit Tracker presentation tier

The React 19 frontend uses Vite and React Router to display users, teams,
activities, leaderboard entries, and workouts from the API on port 8000.

## Configure the API URL

When running in GitHub Codespaces, Vite uses the Codespace's `CODESPACE_NAME`
environment variable automatically. To override it, define
`VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes the selected value through `import.meta.env.VITE_CODESPACE_NAME`;
the frontend then calls `https://<VITE_CODESPACE_NAME>-8000.app.github.dev`.
Restart the Vite development server after changing `.env.local`.

If `VITE_CODESPACE_NAME` is unset, the frontend safely uses
`http://localhost:8000`. See `.env.example` for the optional local environment
file template.

## Run the frontend

Install dependencies and start Vite from the repository root:

```sh
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
