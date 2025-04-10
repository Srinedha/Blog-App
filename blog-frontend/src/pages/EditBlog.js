import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '' });

  useEffect(() => {
    API.get(`/api/blogs/${id}/`)
      .then(res => setBlog(res.data))
      .catch(err => console.error("Failed to load blog", err));
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/blogs/${id}/`, blog);
      navigate(`/blog/${id}`); // Redirect to blog detail page
    } catch (err) {
      alert("Update failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
