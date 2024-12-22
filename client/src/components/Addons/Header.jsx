import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import '../../App.css'

const Header = () => {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth.token");
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
          {!auth.user ? (
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

              {/* Category Link */}
              <li className="list-item-inline">
                <NavLink to="/category"    className={({ isActive }) => (isActive ? "link link-active" : "link")}>
                  Category
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
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  {/* Cart Link */}
                  <li className="list-item-inline">
                    <NavLink to="/"    className={({ isActive }) => (isActive ? "link link-active" : "link")}>
                      Cart(0)
                    </NavLink>
                  </li>
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
