import { useState, useEffect } from "react";
import { getPosts } from "../../managers/postManager";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ListInlineItem,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./posts.css";

export const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userName } = useParams();

  useEffect(() => {
    getPosts().then((postArr) => {
      setPosts(postArr.filter((p) => p.userProfileId == userId));
    });
  }, []);

  return (
    <>
      <Button>Subscribe</Button>
      <h2>{userName}</h2>
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
