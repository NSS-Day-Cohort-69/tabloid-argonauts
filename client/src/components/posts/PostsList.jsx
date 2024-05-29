import { useState, useEffect } from "react";
import { getPosts } from "../../managers/postManager";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((arr) => setPosts(arr));
  }, []);
  return (
    <>
      <h1>Posts List</h1>
      {posts.map((p) => (
        <Card
          key={p.id}
          style={{
            width: "10rem",
          }}
        >
          <CardBody>
            <CardTitle tag="h5">{p.title}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {p.userProfile?.fullName}
            </CardSubtitle>
            <CardText>{p.category?.categoryName}</CardText>
            <Button
              onClick={() => {
                navigate(`/posts/${p.id}`);
              }}
            >
              View Post
            </Button>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
