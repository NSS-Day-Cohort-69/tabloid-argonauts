import React, { useState, useEffect } from 'react';
import { deleteCategory } from '../../managers/categoryManager';
import { Link } from 'react-router-dom';
import CategoryEditForm from './CategoryEdit';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteCategory(categoryToDelete);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.categoryName}
            <button onClick={() => {
              setCategoryToDelete(category.id);
              setShowConfirmation(true);
            }}>Delete</button>
            <Link to={`/categories/edit/${category.id}`}>Edit</Link> 
          </li>
        ))}
      </ul>

      
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this category?</p>
          <button onClick={handleConfirmDelete}>Delete</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
