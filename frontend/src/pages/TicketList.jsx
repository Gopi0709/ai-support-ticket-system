import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../services/api";

function TicketList() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    status: "",
  });

  // Fetch Tickets
  const loadTickets = async (appliedFilters = {}) => {
    try {
      setLoading(true);
      const data = await getTickets(appliedFilters);
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  // Handle filter changes
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== "")
    );
    loadTickets(cleanedFilters);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      priority: "",
      status: "",
    });
    loadTickets();
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner spinner-dark"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Support Tickets</h1>

      {/* Filters */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            name="search"
            placeholder="Search title or description..."
            value={filters.search}
            onChange={handleChange}
          />

          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="">All Categories</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="general">General</option>
          </select>

          <select name="priority" value={filters.priority} onChange={handleChange}>
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <button onClick={applyFilters}>Apply</button>
          <button onClick={clearFilters}>Clear</button>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{ticket.title}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {ticket.category}
                  </td>
                  <td className={`priority-${ticket.priority}`}>
                    {ticket.priority}
                  </td>
                  <td>
                    <span className={`badge ${ticket.status}`}>
                      {ticket.status.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketList;
