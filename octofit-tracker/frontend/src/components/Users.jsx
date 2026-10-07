import { useEffect, useState } from 'react';
import apiBase from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/users/`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : data.results ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1>Users</h1>
      {loading ? <p>Loading users...</p> : null}
      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id ?? user.username ?? user.name} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{user.name}</h2>
                <p className="mb-1"><strong>Username:</strong> {user.username}</p>
                <p className="mb-1"><strong>Goal:</strong> {user.fitnessGoal}</p>
                <p className="mb-0"><strong>Level:</strong> {user.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
