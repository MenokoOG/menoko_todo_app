import React, { useState } from 'react';
import './App.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

  // Function to handle adding posts
  const handlePostAdded = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <h1>Menoko OG Stuff App</h1>
      {/* Pass handlePostAdded function as onPostAdded prop */}
      <PostForm onPostAdded={handlePostAdded} />
      {/* Render the list of posts */}
      <PostList />
    </div>
  );
}

export default App;
