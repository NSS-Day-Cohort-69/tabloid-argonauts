import { useEffect, useState } from "react";
import { getPostById } from "../../managers/postManager";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
} from "reactstrap";

export const PostDetails = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then((obj) => setPost(obj));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <>
      <Card
        style={{
          width: "18rem",
        }}
      >
        <img alt="Sample" src={post.headerImage} />
        <CardBody>
          <CardTitle tag="h5">{post.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {post.userProfile?.userName}
          </CardSubtitle>
          <CardText>{post.content}</CardText>
        </CardBody>
        <CardFooter>{formatDate(post.publicationDate)}</CardFooter>
      </Card>
    </>
  );
};
