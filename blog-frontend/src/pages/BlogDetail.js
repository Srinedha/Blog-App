import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch blog details and current user
  useEffect(() => {
    API.get(`/api/blogs/${id}/`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Error fetching blog detail:", err));

    API.get('/auth/users/me/')
      .then((res) => {
        console.log("Current User:", res.data.username);
        setCurrentUser(res.data.username);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  // Debugging log
  useEffect(() => {
    if (blog && currentUser) {
      const isAuthor = blog.author?.toLowerCase().trim() === currentUser?.toLowerCase().trim();
      console.log("Blog Author:", blog.author);
      console.log("Is Author:", isAuthor);
    }
  }, [blog, currentUser]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await API.delete(`/api/blogs/${id}/`);
        navigate('/');
      } catch (err) {
        alert("Failed to delete blog.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!blog) return <p>Loading...</p>;

  const isAuthor = blog.author?.toLowerCase().trim() === currentUser?.toLowerCase().trim();

  return (
    <div style={{
      maxWidth: '700px',
      margin: '30px auto',
      background: '#fff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{blog.title}</h2>
      <p style={{ fontSize: '14px', color: 'gray', marginBottom: '20px' }}>
        By {blog.author} on {new Date(blog.created_at).toLocaleString()}
      </p>
      <p style={{ fontSize: '16px', marginBottom: '24px' }}>{blog.content}</p>

      {isAuthor && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleEdit} style={{ background: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '5px' }}>
            Edit
          </button>
          <button onClick={handleDelete} style={{ background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '5px' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
