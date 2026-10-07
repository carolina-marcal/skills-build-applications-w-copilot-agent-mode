import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('/api/leaderboard/', controller.signal)
      .then(setEntries)
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <section>
      <h1>Leaderboard</h1>
      {loading ? <p role="status">Loading leaderboard...</p> : null}
      {error ? <p className="alert alert-danger" role="alert">{error}</p> : null}
      {!loading && !error && entries.length === 0 ? <p>No leaderboard entries found.</p> : null}
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id ?? entry.name} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{entry.position}. {entry.name}</strong>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
