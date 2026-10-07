import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('/api/workouts/', controller.signal)
      .then(setWorkouts)
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
      <h1>Workouts</h1>
      {loading ? <p role="status">Loading workouts...</p> : null}
      {error ? <p className="alert alert-danger" role="alert">{error}</p> : null}
      {!loading && !error && workouts.length === 0 ? <p>No workouts found.</p> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id ?? workout.name} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{workout.name}</h2>
                <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                <p className="mb-0"><strong>Difficulty:</strong> {workout.difficulty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
