import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('/api/teams/', controller.signal)
      .then(setTeams)
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
      <h1>Teams</h1>
      {loading ? <p role="status">Loading teams...</p> : null}
      {error ? <p className="alert alert-danger" role="alert">{error}</p> : null}
      {!loading && !error && teams.length === 0 ? <p>No teams found.</p> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id ?? team.name} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{team.name}</h2>
                <p className="mb-1"><strong>Captain:</strong> {team.captain}</p>
                <p className="mb-1"><strong>Goal:</strong> {team.goal}</p>
                <p className="mb-0"><strong>Members:</strong> {team.members?.join(', ') || 'No members yet'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
