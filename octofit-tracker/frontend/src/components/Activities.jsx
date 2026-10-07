import { useEffect, useState } from 'react';
import apiBase from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/activities/`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(Array.isArray(data) ? data : data.results ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1>Activities</h1>
      {loading ? <p>Loading activities...</p> : null}
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
