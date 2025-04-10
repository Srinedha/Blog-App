import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('/api/blogs/')
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Failed to fetch blogs", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Blogs</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} className="border-b py-4">
            <Link to={`/blog/${blog.id}`}>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
            </Link>
            <p className="text-gray-600 text-sm">
              By {blog.author} on {new Date(blog.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
