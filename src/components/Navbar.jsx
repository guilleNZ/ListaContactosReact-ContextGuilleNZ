import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Mi App</Link>
      <div>
        <Link className="me-2" to="/contact">Contactos</Link>
        <Link to="/demo">Demo</Link>
      </div>
    </nav>
  );
}
