const _apiUrl = "/api/category";


export const getAllCategories = () => {
    return fetch (_apiUrl).then((res) => res.json());
}


export const deleteCategory = (categoryId) => {
    return fetch(`${_apiUrl}/${categoryId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
        });
}

export const updateCategory = (categoryId, updatedCategoryName) => {
    return fetch(`${_apiUrl}/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoryName: updatedCategoryName })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update category');
            }
        });
}


export const createCategory = async (categoryDTO) => {
    try {
      const response = await fetch(_apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryDTO)
      });
  
      if (!response.ok) {
        throw new Error('Failed to create category');
      }
  
      const data = await response.json();
      return data;
        } 
        catch (error) {
        console.error('Error creating category:', error);
        throw error; 
    }
  };