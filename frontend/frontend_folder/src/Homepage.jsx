import React from "react";
import { useNavigate } from "react-router-dom";
import { get_sessionstorage, delete_sessionstorage } from "./utils";
import "./Homepage.css";
import Listblogs from "./Listblogs";

export const Homepage = ({ children }) => {
  const session_token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    delete_sessionstorage();
    // Redirect to login page or some other page
    window.location.href = "/"; // Change this to your login page path
  };
  const fetchdata = async () => {
    const session_token = sessionStorage.getItem("token");
    // const session_token = get_sessionstorage();
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session_token}`,
        // Authorization: `Bearer `,
      },
    };
    const fetchdata = await fetch(
      "https://test-flask-backend-lime.vercel.app/d",
      options
    );
    const data = await fetchdata.json();
    console.log(data.msg);
    console.log(data.users);

    if (!fetchdata.ok) {
      if (fetchdata.status === 422) {
        alert("you have to login to use this fearture");
        navigate("/app");
      } else if (fetchdata.status === 401) {
        alert("you habe to login to use this feature ");
        navigate("/app");
      } else {
        alert("Please loging again your session as ended");
        delete_sessionstorage();
        navigate("/app");
      }
    }
    try {
      const users = data.users;
      users.map((users, index) => {
        console.log(index, users.name);
      });
    } catch {
      navigate("/app");
    }
  };

  return (
    <>
      {/* <button onClick={fetchdata}>fetch data </button> */}
      <div>Homepage</div>
      <Listblogs></Listblogs>
      {children}
    </>
  );
};
