import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('/api/blogs/')
      .then((res) => {
        console.log('API Response:', res.data);
        if (Array.isArray(res.data.results)) {
          setBlogs(res.data.results); // ✅ Set only the array
        } else {
          setBlogs([]); // fallback
        }
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
        setBlogs([]);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{color:'seagreen',fontSize:'32px'}}>Blog Posts</h2>

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
          {blogs.map(blog => (
            <li key={blog.id} style={{ marginBottom: '20px' }}>
              <h3>
                <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                  {blog.title}
                </Link>
              </h3>
              <p style={{color:'indigo',fontStyle:'italic'}}>{blog.content.length > 100 ? blog.content.slice(0, 100) + '...' : blog.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
