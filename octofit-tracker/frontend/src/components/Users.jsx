import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('/api/users/', controller.signal)
      .then(setUsers)
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
      <h1>Users</h1>
      {loading ? <p role="status">Loading users...</p> : null}
      {error ? <p className="alert alert-danger" role="alert">{error}</p> : null}
      {!loading && !error && users.length === 0 ? <p>No users found.</p> : null}
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
