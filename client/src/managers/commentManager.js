const _apiUrl = "/api/comment";

export const getCommentsByPostId = (postId) => {
    return fetch(`${_apiUrl}?postId=${postId}`)
        .then((res) => res.json());
};

export const createComment = async (commentDTO) => {
        const response = await fetch(`${_apiUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentDTO)
        });

        const data = await response.json();
        return data;
   
};

export const deleteComment = async (commentId) => {
    const response = await fetch(`${_apiUrl}/${commentId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
};