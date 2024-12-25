import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import '../../App.css'

const Header = () => {
  const { auth, setAuth } = useAuth();

  console.log("localStorage:", localStorage);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" }); // Reset the auth state
   
  };

  return (
    <>
      <nav className="navigation container">
        <div id="nav-name">
          <NavLink className="link" to="/">
            Expense Manager
          </NavLink>
        </div>
        <ul className="nav-items">
          {auth.user === null ? (
            <>
              <li className="list-item-inline">
                <NavLink to="/"    className={({ isActive }) => (isActive ? "link link-active" : "link")}>
                  Register
                </NavLink>
              </li>
              <li className="list-item-inline">
                <NavLink to="/login"    className={({ isActive }) => (isActive ? "link link-active" : "link")}>
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {/* Home Link */}
              <li className="list-item-inline">
                <NavLink to="/homepage"    className={({ isActive }) => (isActive ? "link link-active" : "link")}>
                  Home
                </NavLink>
              </li>

              {/* User/Dropdown Menu */}
              <li className="list-item-inline dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {auth?.user?.role === 1 ? "Admin" : auth.user.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to="/login"
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
