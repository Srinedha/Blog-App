import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/blogs/', { title, content });
      setSubmitted(true);
    } catch (err) {
      alert("You must be logged in to create a blog.");
    }
  };

  useEffect(() => {
    if (submitted) {
      navigate('/');
    }
  }, [submitted, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '500px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '30px',
          borderRadius: '10px',
        }}
      >
        <h2 style={{ color: 'navy', textAlign: 'center', marginBottom: '20px' }}>
          Create a Blog Post
        </h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            height: '150px',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'navy',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
