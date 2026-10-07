import { useEffect, useState } from 'react';
import apiBase from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/teams/`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(Array.isArray(data) ? data : data.results ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1>Teams</h1>
      {loading ? <p>Loading teams...</p> : null}
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
