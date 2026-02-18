import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          🎫 SupportDesk
        </div>

        <div className="nav-links">
          <NavLink to="/" end>
            Dashboard
          </NavLink>

          <NavLink to="/tickets">
            Tickets
          </NavLink>

          <NavLink to="/create">
            Create Ticket
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
