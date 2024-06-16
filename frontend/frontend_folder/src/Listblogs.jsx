import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delete_sessionstorage } from "./utils";
import { Link } from "react-router-dom";

function Listblogs() {
  const [upload_blogs, setUpload_blogs] = useState([]);
  const [Change, setChange] = useState(false);
  const [Username, setusername] = useState("");
  const navigate = useNavigate();
  const session_token = sessionStorage.getItem("token");
  const session_username = sessionStorage.getItem("username");
  useEffect(() => {
    fetchdata();
    userNameFetch();
  }, [Change]);

  const fetchdata = async () => {
    const options = {
      method: "GET",
    };
    const response = await fetch(
      "https://test-flask-backend-lime.vercel.app/blogs",
      options
    );

    if (response.ok) {
      const data = await response.json();
      setUpload_blogs(data.blogs);
    } else {
      console.error("Failed to fetch blogs");
    }
  };

  const handleDelete = async (id, title) => {
    let text = "are you sure you want to delete it?";
    if (confirm(text) === true) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session_token}`,
        },
      };
      const response = await fetch(
        `https://test-flask-backend-lime.vercel.app/blogs/delete/${id}`,
        options
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 422) {
          alert("you have to login to use this feature");
          delete_sessionstorage();
          navigate("/app");
        } else if (response.status === 401) {
          alert("you have to login to use this feature");
          delete_sessionstorage();
          navigate("/app");
        } else if (response.status === 404) {
          alert("you are not the author!");
        } else if (response.status === 200) {
          alert(`${data.msg}`);
          // alert(`${`);
          console.log(200);
        } else if (response.status === 500) {
          console.log(500);
          alert(`${data.msg}`);
        } else {
          alert("Please login again, your session has ended");
          delete_sessionstorage();
          navigate("/app");
        }
      } else {
        alert(`${data.msg}`);
        setChange(!Change);
      }
    } else {
      alert(`you canceled your deletion process for ${title}`);
    }
  };

  const userNameFetch = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
    };
    const response = await fetch(
      `https://test-flask-backend-lime.vercel.app/user_name_fetch`,
      options
    );
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        alert("you have to login to use this feature");
        delete_sessionstorage();
        navigate("/app");
      } else if (response.status === 404) {
        alert("you are not the author!");
      } else if (response.status === 200) {
        alert(`${data.msg}`);
        console.log("200");
      } else if (response.status === 500) {
        console.log("500");
        alert(`${data.msg}`);
      } else if (response.status === 422) {
        console.log("500");
        // alert(`${data.msg}`);
      } else {
        delete_sessionstorage();
      }
    } else {
      // setChange(!Change);
      setusername(data.user);
    }
  };

  return (
    <>
      <div>
        {Username && Username != "" && Username != null ? (
          <h4>welcome {Username}</h4>
        ) : (
          <>
            {" "}
            <Link to={"/app"}>
              <h4>Do loging to access more features</h4>
            </Link>
          </>
        )}

        <h1>All Blogs</h1>
        <ul>
          {upload_blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blog/${blog.id}`}>
                <strong>{blog.title}</strong>
              </Link>
              {session_token != null &&
              session_token !== "" &&
              session_token &&
              session_username === blog.author ? (
                <>
                  {" "}
                  <Link to={`/update/${blog.id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={() => handleDelete(blog.id, blog.title)}>
                    Delete
                  </button>
                </>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Listblogs;
