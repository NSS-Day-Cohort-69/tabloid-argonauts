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