const _apiUrl = "/api/post";

export const getPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getPostById = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const createPost = async (post) => {
  try {
    const response = await fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error("Failed to create this post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating this post:", error);
    throw error;
  }
};

export const deletePost = (postId) => {
  return fetch(_apiUrl + `${postId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
  });
};
