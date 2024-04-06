import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    // Update input without refreshing
    setTitle(title);
    setDescription(description);
  }, [title, description]);

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      const newPost = { title,  description };
      const response = await axios.post('/api/posts', newPost);
      onPostAdded(response.data);
      setTitle('');
      setDescription('');
      
      
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="container"> {/* Apply container class */}
      <h2>Add Stuff</h2>
      <form className="form" onSubmit={handleSubmit}> {/* Apply form and form classes */}
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PostForm;
