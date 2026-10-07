import { useEffect, useState } from 'react';
import apiBase from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/workouts/`)
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.results ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1>Workouts</h1>
      {loading ? <p>Loading workouts...</p> : null}
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
