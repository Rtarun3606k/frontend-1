import { useState } from "react";
import "./App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Register() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Correctly using the hook here
  let sessionToken = sessionStorage.getItem("token");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Username,
          password: password,
        }),
      };
      const response = await fetch(
        "https://test-flask-backend-lime.vercel.app/token",
        options
      );
      console.log("status code", response.status);
      if (!response.ok) {
        if (response.status === 401) {
          alert("Invalid username or password");
        } else if (response.status === 409) {
          alert("User already exists");
        } else {
          alert("Error: " + response.statusText);
        }
      } else {
        const data = await response.json(); // Parsing the JSON response
        console.log(data);
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("username", Username);
        sessionToken = data.access_token;
        navigate("/");
      } // Using the navigate function correctly
    } catch (error) {
      console.error("Fetch error: ", error);
    }
    setPassword("");

    setUsername("");
  };

  const fetchUserData = async () => {
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "https://test-flask-backend-lime.vercel.app/",
        options
      );
      const userData = await response.json();
      console.log(userData);
      // Now you can use userData.name and userData.password as needed
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <>
      {sessionToken && sessionToken !== "" && sessionToken !== null ? (
        "Login successful"
      ) : (
        <div className="clone">
          <div className="wrapper">
            <form action="">
              <h1>Login</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  value={Username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  //   required
                />
                <i className="bx bxs-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  //   required
                />
                <i className="bx bxs-lock-alt"></i>
              </div>

              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>
                {/* <a href="#">Forgot Password</a> */}
              </div>
              <button type="submit" className="btn" onClick={handleClick}>
                Register
              </button>
              <div className="register-link">
                <p>
                  Already have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Register;
