import { useEffect, useState } from 'react';
import apiBase from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/leaderboard/`)
      .then((response) => response.json())
      .then((data) => {
        setEntries(Array.isArray(data) ? data : data.results ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1>Leaderboard</h1>
      {loading ? <p>Loading leaderboard...</p> : null}
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
