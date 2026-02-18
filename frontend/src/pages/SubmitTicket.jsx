import { useState } from "react";
import { createTicket, classifyTicket } from "../services/api";

function SubmitTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!description) return;

    setLoading(true);
    const result = await classifyTicket(description);
    setCategory(result.category);
    setPriority(result.priority);
    setLoading(false);
  };

  const handleSubmit = async () => {
    const newTicket = {
      title,
      description,
      category,
      priority,
      status: "open",
    };

    await createTicket(newTicket);
    alert("Ticket created successfully!");
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Submit Ticket</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={handleAnalyze}>
        {loading ? "Analyzing..." : "Analyze with AI"}
      </button>

      <br /><br />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="technical">Technical</option>
        <option value="billing">Billing</option>
        <option value="general">General</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <br /><br />

      <button onClick={handleSubmit}>Submit Ticket</button>
    </div>
  );
}

export default SubmitTicket;
