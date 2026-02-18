import { useEffect, useState } from "react";
import { getStats } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return <div className="container">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <h1>Support Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{stats.total_tickets}</p>
        </div>

        <div className="stat-card">
          <h3>Open Tickets</h3>
          <p>{stats.open_tickets}</p>
        </div>

        <div className="stat-card">
          <h3>Avg Tickets Per Day</h3>
          <p>{Math.round(stats.avg_tickets_per_day)}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
