const _apiUrl = "/api/comment";

export const getCommentsByPostId = (postId) => {
    return fetch(`${_apiUrl}?postId=${postId}`)
        .then((res) => res.json());
};

export const createComment = async (commentDTO) => {
    try {
        const response = await fetch(_apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentDTO)
        });

        if (!response.ok) {
            throw new Error('Failed to create comment');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};