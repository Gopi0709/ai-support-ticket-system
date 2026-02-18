// ========================================
// API Configuration
// ========================================

// Use environment variable if available (production ready)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";


// ========================================
// Helper: Handle Response
// ========================================

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = "Something went wrong";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || JSON.stringify(errorData);
    } catch {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};


// ========================================
// Tickets - CRUD
// ========================================

// Get All Tickets (with filters)
export const getTickets = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${API_BASE_URL}/tickets/${query ? `?${query}` : ""}`
  );

  return handleResponse(response);
};


// Get Single Ticket
export const getTicketById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}/`);
  return handleResponse(response);
};


// Create Ticket
export const createTicket = async (data) => {
  const response = await fetch(`${API_BASE_URL}/tickets/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};


// Update Ticket (PATCH)
export const updateTicket = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};


// Delete Ticket
export const deleteTicket = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete ticket");
  }

  return true;
};


// ========================================
// AI Classification
// ========================================

export const classifyTicket = async (description) => {
  const response = await fetch(`${API_BASE_URL}/tickets/classify/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  return handleResponse(response);
};


// ========================================
// Stats
// ========================================

export const getStats = async () => {
  const response = await fetch(`${API_BASE_URL}/tickets/stats/`);
//   return handleResponse(response);
  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json();
};



export const updateTicketStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Failed to update status");
  return response.json();
};
