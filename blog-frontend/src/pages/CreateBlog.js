import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(true); // assume true initially

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title.trim() || !blog.content.trim()) {
      alert("Both title and content are required.");
      return;
    }

    try {
      const response = await API.post('/api/blogs/', blog);
      navigate(`/blog/${response.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create blog. Please make sure you're logged in.");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border mb-4 px-3 py-2"
          required
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full border mb-4 px-3 py-2"
          rows={6}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
