import React from 'react';
import { useParams } from 'react-router-dom';
import { updateCategory } from '../../managers/categoryManager';

const CategoryEditForm = () => {
  const { id } = useParams(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCategoryName = event.target.elements.categoryName.value;
    try {
      await updateCategory(id, updatedCategoryName);
      window.history.back();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input type="text" name="categoryName" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CategoryEditForm;
