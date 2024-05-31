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
      console.error(
        "Server response status:",
        response.status,
        response.statusText
      );
      try {
        const errorData = await response.json();
        console.error("Server response JSON:", errorData);
      } catch (jsonError) {
        console.error(
          "Server response could not be parsed as JSON:",
          jsonError
        );
      }
      throw new Error("Failed to create this post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating this post:", error);
    throw error;
  }
};

export const createPostTag = async (postId, tagArr) => {
  return await fetch(`${_apiUrl}/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagArr),
  }).then((res) => res.json);
};

export const deletePost = (postId) => {
  return fetch(_apiUrl + `/${postId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  });
};
