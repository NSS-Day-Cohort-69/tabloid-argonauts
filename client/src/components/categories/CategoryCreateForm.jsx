

import React, { useState } from 'react';
import { createCategory } from '../../managers/categoryManager';
import { useNavigate } from 'react-router-dom';

const CategoryCreateForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryDTO = { CategoryName: categoryName };
      await createCategory(categoryDTO);
      navigate('/categories');
    } 
    catch (error) {
      console.error('Error creating category:', error);
    }
  };
  

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CategoryCreateForm;
