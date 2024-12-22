import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import "../../App.css";

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
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm ">
        <div className="container-fluid">
          {/* Navbar Toggler for Mobile View */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Brand / Logo */}
          <NavLink to="/" className="navbar-brand fw-bold">
            MyBrand
          </NavLink>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Conditionally Render Links */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* Home Link */}
                  <li className="nav-item">
                    <NavLink to="/homepage" className="nav-link">
                      Home
                    </NavLink>
                  </li>

                  {/* Category Link */}
                  <li className="nav-item">
                    <NavLink to="/category" className="nav-link">
                      Category
                    </NavLink>
                  </li>

                  {/* User/Dropdown Menu */}
                  <li className="nav-item dropdown">
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

              {/* Cart Link */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
