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

export const PostDetails = ({ loggedInUser }) => {
  const [post, setPost] = useState({});
  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagSelections, setTagSelections] = useState([]);
  const { id } = useParams();
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getPostById(id).then((obj) => setPost(obj));
  }, []);

  // fetch tags from databaase
  useEffect(() => {
    const tags = [
      { id: 1, name: "tag1", postId: 1 },
      { id: 2, name: "tag2", postId: 2 },
      { id: 3, name: "tag3" },
      { id: 4, name: "tag4" },
    ];
    setTags(tags);
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
          <CardText>{post.content}</CardText>
          {post?.userProfile?.id == loggedInUser.id ? (
            <Button onClick={toggle}>Manage Tags</Button>
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
                <Label check>{t.name}</Label>
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
