import { useEffect, useState } from "react";
import { deletePost, getPostById } from "../../managers/postManager";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { GetAllTags } from "../../managers/TagManager";

export const PostDetails = ({ loggedInUser }) => {
  const [post, setPost] = useState({});
  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagSelections, setTagSelections] = useState([]);
  const { id } = useParams();
  const toggle = () => setModal(!modal);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then((obj) => setPost(obj));
  }, [id]);

  // fetch tags from databaase
  useEffect(() => {
    GetAllTags().then((arr) => setTags(arr));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleInputChange = (event) => {
    const tag = parseInt(event.target.id);
    if (event.target.checked) {
      setTagSelections((prevSelections) => [...prevSelections]);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId).then(() => {
        navigate("/myposts")
      });
    } catch (error) {
      console.error('Error deleting this post:', error);
    }
  }

  const handleConfirmDelete = () => {
    handleDeletePost(postToDelete);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Card
        key={id}
        style={{
          width: "25rem",
        }}
      >
        <img alt="Sample" src={post.headerImage} />
        <CardBody>
          <CardTitle tag="h5">{post.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {post.userProfile?.userName}
          </CardSubtitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            <Link to={`/posts/${post.id}/comments`}>View Comments</Link>
          </CardSubtitle>
          <CardText>{post.content}</CardText>
          {post?.userProfile?.id == loggedInUser.id ? (
            <>
            <Button onClick={toggle}>Manage Tags</Button>
            <Button onClick={() => {
              setPostToDelete(post.id);
              setShowConfirmation(true);
            }}>Delete</Button>

        {showConfirmation && (
          <div className="confirmation-modal">
            <p>Are you sure you want to delete this post?</p>
            <button onClick={handleConfirmDelete}>Delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        )}
            </>
          ) : (
            ""
          )}
        </CardBody>
        <CardFooter>{formatDate(post.publicationDate)}</CardFooter>
      </Card>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Choose tags for post</ModalHeader>
        <ModalBody>
          <Form onSubmit>
            {tags.map((t) => (
              <FormGroup check key={t.id}>
                <Input id={t.id} type="checkbox" value={t.name} onChange />{" "}
                <Label check>{t.tagName}</Label>
              </FormGroup>
            ))}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Save</Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
