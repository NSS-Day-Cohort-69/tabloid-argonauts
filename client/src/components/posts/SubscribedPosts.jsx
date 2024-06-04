import { useEffect, useState } from "react";
import { getPosts } from "../../managers/postManager";
export const SubscribedPosts = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);
};
