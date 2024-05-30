import { useEffect, useState } from "react";
import { getPostById } from "../../managers/postManager";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
} from "reactstrap";
import CommentForm from "../comments/commentForm";

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
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            <Link to ={`/posts/${post.id}/comments`}>View Comments</Link>
          </CardSubtitle>
          <CardText>{post.content}</CardText>
        </CardBody>
        <CardFooter>{formatDate(post.publicationDate)}</CardFooter>
        <CommentButton postId={post.id} />
      </Card>
    </>
  );
};















































































const CommentButton = ({ postId }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const toggleCommentForm = () => {
    setShowCommentForm((prev) => !prev);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={toggleCommentForm}>
        {showCommentForm ? "Hide Comment Form" : "Add Comment"}
      </button>
      {showCommentForm && <CommentForm postId={postId} />}
    </div>
  );
};