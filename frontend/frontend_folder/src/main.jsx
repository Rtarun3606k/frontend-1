import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Layout } from "./layout.jsx";
import { Nopage } from "./Nopage.jsx";
import Register from "./register.jsx";
import { Homepage } from "./Homepage.jsx";
import App from "./App.jsx";
import Upload from "./Upload.jsx";
import Listblogs from "./Listblogs.jsx";
import BlogDetails from "./BlogDetails.jsx";
import UpdatePage from "./UpdatePage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<App />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/list" element={<Listblogs />} />
          <Route path="*" element={<Nopage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
