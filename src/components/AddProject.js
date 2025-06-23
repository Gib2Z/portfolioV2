import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/AddProject.css';

function AddProject() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('languages', languages.join(', '));
    images.forEach(image => formData.append('images', image));

    const token = localStorage.getItem('token');

    axios.post('http://localhost:5000/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Server response:', response);
        alert('Project added successfully!');
        setCategory('');
        setTitle('');
        setDescription('');
        setLanguages([]);
        setImages([]);
        setNewLanguage('');
      })
      .catch(error => {
        setError('There was an error adding the project!');
        console.error('There was an error adding the project!', error);
      });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() !== '') {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
    }
  };

  return (
    <div className="add-project">
      <h2>Add a New Project</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Languages:</label>
          <div className="languages-input">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
            />
            <button type="button" onClick={handleAddLanguage}>Add Language</button>
          </div>
          <ul>
            {languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default AddProject;
