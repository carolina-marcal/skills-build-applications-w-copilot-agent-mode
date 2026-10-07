import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('/api/activities/', controller.signal)
      .then(setActivities)
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
      <h1>Activities</h1>
      {loading ? <p role="status">Loading activities...</p> : null}
      {error ? <p className="alert alert-danger" role="alert">{error}</p> : null}
      {!loading && !error && activities.length === 0 ? <p>No activities found.</p> : null}
      <div className="row g-3">
        {activities.map((activity) => (
          <div key={activity._id ?? activity.name} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{activity.name}</h2>
                <p className="mb-1"><strong>Type:</strong> {activity.type}</p>
                <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes} min</p>
                <p className="mb-0"><strong>Calories burned:</strong> {activity.caloriesBurned}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
