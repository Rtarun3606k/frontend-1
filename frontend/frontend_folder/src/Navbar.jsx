import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { delete_sessionstorage } from "./utils";

export const Navbar = () => {
  const navigate = useNavigate();

  const session_token = sessionStorage.getItem("token");

  const logout = () => {
    sessionStorage.removeItem("token");
    delete_sessionstorage();
    // Redirect to login page or some other page
    window.location.href = "/"; // Change this to your login page path
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/upload">
                  Upload
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " aria-disabled="true" to="/list">
                  list of blogs
                </Link>
              </li>
            </ul>

            {session_token && session_token !== "" && session_token !== null ? (
              <button onClick={logout}>logout</button>
            ) : (
              <button
                onClick={() => {
                  navigate("/app");
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
