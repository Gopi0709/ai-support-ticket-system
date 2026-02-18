import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import TicketList from "./pages/TicketList";
import TicketDetails from "./pages/TicketDetails";
import CreateTicket from "./pages/CreateTicket";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
          <Route path="/create" element={<CreateTicket />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
