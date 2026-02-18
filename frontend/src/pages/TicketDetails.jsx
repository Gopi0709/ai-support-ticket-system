import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById, updateTicket } from "../services/api";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const data = await getTicketById(id);
      setTicket(data);
    } catch (err) {
        console.error(err);
      setError("Failed to load ticket.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);

    try {
      const updated = await updateTicket(id, { status: newStatus });
      setTicket(updated);
    } catch (err) {
        console.error(err);
        
      alert("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="container"><p>Loading ticket...</p></div>;
  if (error) return <div className="container"><p>{error}</p></div>;
  if (!ticket) return null;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="card ticket-details-card">
        <h1>{ticket.title}</h1>

        <div className="ticket-meta">
          <div>
            <strong>Category:</strong>{" "}
            <span style={{ textTransform: "capitalize" }}>
              {ticket.category}
            </span>
          </div>

          <div>
            <strong>Priority:</strong>{" "}
            <span className={`priority-${ticket.priority}`}>
              {ticket.priority}
            </span>
          </div>

          <div>
            <strong>Status:</strong>{" "}
            <span className={`badge ${ticket.status}`}>
              {ticket.status.replace("_", " ")}
            </span>
          </div>

          <div>
            <strong>Created:</strong>{" "}
            {new Date(ticket.created_at).toLocaleString()}
          </div>
        </div>

        <hr />

        <div className="description-section">
          <h3>Description</h3>
          <p>{ticket.description || "No description provided."}</p>
        </div>

        <hr />

        <div className="status-update">
          <h3>Update Status</h3>
          <select
            value={ticket.status}
            onChange={handleStatusChange}
            disabled={updating}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
