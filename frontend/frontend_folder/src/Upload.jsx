import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { delete_sessionstorage } from "./utils";

function Upload() {
  const [blogdata, setblogdata] = useState("");
  const [blogtitle, setblogtitle] = useState("");
  const session_token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    console.log("working");
    console.log(blogdata);
    console.log(blogtitle);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session_token}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blog_title: blogtitle,
        blog_data: blogdata,
      }),
    };

    const response = await fetch(
      "https://test-flask-backend-lime.vercel.app/upload_blogs",
      options
    );
    const data = await response.json();
    console.log("coustume alert", data.msg, response.status);

    console.log("in catch");
    setblogdata("");
    setblogtitle("");
    if (!response.ok) {
      if (response.status === 422) {
        alert("you have to login to use this fearture");
        delete_sessionstorage();
        navigate("/app");
      } else if (response.status === 401) {
        alert("you habe to login to use this feature ");
        delete_sessionstorage();
        navigate("/app");
      } else {
        alert("Please loging again your session as ended");
        delete_sessionstorage();
        navigate("/app");
      }
    } else {
      alert("Blog created sucessfully!!");
      navigate("/");
    }
  };
  return (
    <div>
      <label htmlFor="">title</label>
      <input
        type="text "
        value={blogtitle}
        onChange={(e) => {
          setblogtitle(e.target.value);
        }}
      />
      <label htmlFor="">content</label>
      <textarea
        name="text"
        id=""
        value={blogdata}
        onChange={(e) => {
          setblogdata(e.target.value);
        }}
      ></textarea>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default Upload;
