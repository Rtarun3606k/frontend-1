import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdatePage() {
  const { id } = useParams();
  const [Content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const session_token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [blogcontent, setblogcontent] = useState("");

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const updateBlog = async (id) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        update_content: blogcontent,
      }),
    };

    const response = await fetch(
      `https://test-flask-backend-lime.vercel.app/blog_update/${id}`,
      options
    );
    const data = await response.json();
    if (!response.ok) {
      // console.log("some error occurred");
    } else {
      // console.log(data.msg);
      // Optionally, navigate to another page after successful update
      navigate(`/`);
      alert("updated sucessfully");
    }
  };

  const fetchBlog = async (blogId) => {
    try {
      const response = await fetch(
        `https://test-flask-backend-lime.vercel.app/blogs/${blogId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }
      const data = await response.json();
      setContent(data.blog);
      setblogcontent(data.blog.content); // Set the content of the blog in the textarea
      setLoading(false);
      //   navigate("/");
    } catch (error) {
      // console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Content || Object.keys(Content).length === 0) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <label htmlFor="blogcontent">Content</label>
      <textarea
        id="blogcontent"
        value={blogcontent}
        onChange={(e) => {
          setblogcontent(e.target.value);
        }}
      ></textarea>
      <li>{Content.id}</li>
      <button
        onClick={() => {
          updateBlog(Content.id);
        }}
      >
        Save
      </button>
    </>
  );
}

export default UpdatePage;
