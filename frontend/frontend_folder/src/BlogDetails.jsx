import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (blogId) => {
    try {
      const response = await fetch(
        `https://test-flask-backend-lime.vercel.app/blogs/${blogId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }
      const data = await response.json();
      setBlog(data.blog);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog || Object.keys(blog).length === 0) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
