import { useEffect, useState } from "react";
import { getStats } from "../services/api";

function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return null;

  return (
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
        <h3>Avg / Day</h3>
        <p>{stats.avg_tickets_per_day.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default StatsCards;
