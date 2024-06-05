import { useEffect, useState } from "react";
import { getPosts } from "../../managers/postManager";
import { getUserSubscriptions } from "../../managers/subscriptionManager";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
export const SubscribedPosts = ({ loggedInUser }) => {
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserSubscriptions(loggedInUser.id).then(setUserSubscriptions);
  }, []);

  useEffect(() => {
    const SubscribedPosts = [];
    let joinedArray = [];

    userSubscriptions.forEach((s) => SubscribedPosts.push(s.creator.posts));
    joinedArray = SubscribedPosts.reduce((acc, curr) => acc.concat(curr), []);
    setPosts(joinedArray);
  }, [userSubscriptions]);

  const calculateReadTime = (wordCount) => {
    const wordsPerMinute = 265;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  };

  return posts.map((p) => (
    <Card
      key={p.id}
      style={{
        width: "10rem",
      }}
    >
      <CardBody>
        <CardTitle tag="h5">{p.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {userSubscriptions?.creator?.userName}
        </CardSubtitle>
        <CardText>{p.category.categoryName}</CardText>
        <CardText>
          Read Time: {calculateReadTime(p.content?.split(/\s+/).length)}
        </CardText>
        <Button
          onClick={() => {
            navigate(`/posts/${p.id}`);
          }}
        >
          View Post
        </Button>
      </CardBody>
    </Card>
  ));
};
