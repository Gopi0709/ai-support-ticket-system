import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket, classifyTicket } from "../services/api";
import toast from "react-hot-toast";

function CreateTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleClassify = async () => {
    if (!description) {
      toast.error("Please enter description first");
      return;
    }

    try {
      setAiLoading(true);
      const result = await classifyTicket(description);
      setCategory(result.category);
      setPriority(result.priority);
      toast.success("AI classification completed");
    } catch (error) {
        console.error(error);
      toast.error("AI classification failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !priority) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createTicket({
        title,
        description,
        category,
        priority,
        status: "open",
      });

      toast.success("Ticket created successfully!");

      setTimeout(() => {
        navigate("/tickets");
      }, 1500);

    } catch (error) {
      toast.error("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card form-card">
        <h1>Create Ticket</h1>

        <form onSubmit={handleSubmit} className="ticket-form">

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="5"
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            className="ai-btn"
            onClick={handleClassify}
            disabled={aiLoading}
          >
            {aiLoading ? <span className="spinner spinner-dark"></span> : "✨ AI Classify"}
          </button>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="general">General</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="">Select</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Create Ticket"}
        </button>

        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
