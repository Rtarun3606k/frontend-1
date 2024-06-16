import { useState } from "react";
import "./App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Register() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Retypepassword, setRetypePassword] = useState("");
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
        "https://test-flask-backend-lime.vercel.app/register",
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parsing the JSON response
      console.log(data);
      sessionStorage.setItem("token", data.access_token);
      sessionToken = data.access_token;
      navigate("/home"); // Using the navigate function correctly
    } catch (error) {
      console.error("Fetch error: ", error);
    }
    setPassword("");
    setRetypePassword("");
    setUsername("");
  };

  return (
    <>
      <center>
        <div className="clone">
          <div className="wrapper">
            <form action="">
              <h1>Register</h1>
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
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Retype Password"
                  value={Retypepassword}
                  onChange={(e) => {
                    setRetypePassword(e.target.value);
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
                  Already have an account? <Link to="/App">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </center>

      <Outlet />
    </>
  );
}

export default Register;
