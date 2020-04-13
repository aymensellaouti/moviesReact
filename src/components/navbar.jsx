import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand">Navbar</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/movies" className="nav-item nav-link">
            Movies
          </NavLink>
          <NavLink to="/customers" className="nav-item nav-link">
            Customers
          </NavLink>
          <NavLink to="/rentals" className="nav-item nav-link">
            Rentals
          </NavLink>
          {!currentUser && (
            <>
              <NavLink to="/register" className="nav-item nav-link">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
            </>
          )}
          {currentUser && (
            <>
              <div className="nav-item nav-link">{currentUser.name}</div>
              <NavLink to="/logout" className="nav-item nav-link">
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
