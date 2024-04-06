import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/api/posts/${itemId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
    
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditTitle('');
    setEditDescription('');
    
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedItem = {
        title: editTitle,
        description: editDescription
        
      };
      await axios.put(`/api/posts/${editItemId}`, updatedItem);
      fetchPosts();
      handleCancelEdit();
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  return (
    <div className="container">
      <h2>Stuff</h2>
      <div className="grid-container">
        {posts.map(item => (
          <div className="card" key={item._id}>
            {editItemId === item._id ? (
              <form className="edit-form" onSubmit={handleSubmitEdit}>
                <input type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                <input type="text" placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </form>
            ) : (
              <>
                <h2>{item.title}</h2>
                <p>Description: {item.description}</p>
                <div>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
