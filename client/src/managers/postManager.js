const _apiUrl = "/api/post";

export const getPosts = (search, categoryId) => {
  let url = _apiUrl;
  if (search && categoryId) {
    url += `?search=${search}&categoryId=${categoryId}`;
  } else if (search) {
    url += `?search=${search}`;
  } else if (categoryId) {
    url += `?categoryId=${categoryId}`;
  }
  return fetch(url).then((res) => res.json());
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
  return fetch(_apiUrl + `${postId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
  });
};

export const createPostReaction = (postReaction) => {
  return fetch(`${_apiUrl}/postReaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postReaction),
  }).then((res) => res.json);
};

export const getReactionCount = async (postId, reactionId) => {
  const response = await fetch(
    `${_apiUrl}/postReaction/${postId}?reactionId=${reactionId}`
  );
  const count = await response.json();
  return count;
};
