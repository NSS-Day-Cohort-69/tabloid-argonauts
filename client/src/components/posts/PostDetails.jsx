import { useEffect, useState } from "react";
import {
  createPostTag,
  getPostById,
  deletePost,
  createPostReaction,
  getReactionCount,
} from "../../managers/postManager";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import CommentForm from "../comments/commentForm";
import { GetReactions } from "../../managers/reactionManager";
import "./posts.css";
import {
  NewSubscription,
  getSubscriptions,
} from "../../managers/subscriptionManager";

export const PostDetails = ({ loggedInUser }) => {
  const [post, setPost] = useState({});
  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagSelections, setTagSelections] = useState([]);
  const { id } = useParams();
  const toggle = () => setModal(!modal);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState();
  const [reactions, setReactions] = useState([]);
  const [postToDelete, setPostToDelete] = useState();
  const [reactionCounts, setReactionCounts] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState(false);
  const navigate = useNavigate();

  const toggleCommentForm = () => {
    setShowCommentForm((prev) => !prev);
    s;
  };

  useEffect(() => {
    GetReactions().then(setReactions);
  }, []);

  useEffect(() => {
    getPostById(id).then((obj) => setPost(obj));
  }, [id]);

  useEffect(() => {
    GetAllTags().then((arr) => setTags(arr));
  }, []);

  useEffect(() => {
    getPostById(id).then((obj) =>
      setTagSelections(obj.postTags.map((pt) => pt.tagId))
    );
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleInputChange = (tagId) => {
    setTagSelections((prevIds) => {
      if (prevIds.includes(tagId)) {
        return prevIds.filter((id) => id != tagId);
      } else {
        return [...prevIds, tagId];
      }
    });
  };

  const handleSubmit = (id, tagSelections) => {
    createPostTag(id, tagSelections).then(() => {
      toggle();
    });
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId).then(() => {
        navigate("/myposts");
      });
    } catch (error) {
      console.error("Error deleting this post:", error);
    }
  };

  const handleConfirmDelete = () => {
    handleDeletePost(postToDelete);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handlePostReaction = async (reactionId) => {
    const postReaction = {
      postId: parseInt(id),
      userProfileId: parseInt(loggedInUser.id),
      reactionId: parseInt(reactionId),
    };

    await createPostReaction(postReaction);

    const updatedCount = await getReactionCount(id, reactionId);
    setReactionCounts((prev) => ({
      ...prev,
      [reactionId]: updatedCount,
    }));

    console.log("clicked", reactionId);
  };
  useEffect(() => {
    if (reactions.length > 0) {
      reactions.forEach((reaction) => {
        getReactionCount(id, reaction.id).then((count) =>
          setReactionCounts((prev) => ({ ...prev, [reaction.id]: count }))
        );
      });
    }
  }, [reactions, id]);

  const handleSubscribe = () => {
    debugger;
    const subscription = {
      creatorId: post?.userProfile?.id,
      followerId: loggedInUser.id,
    };
    NewSubscription(subscription).then(() => {
      console.log("subscription success");
    });
  };

  useEffect(() => {
    getSubscriptions().then(setSubscriptions);
  }, []);

  useEffect(() => {
    // debugger;
    const userSubscriptions = post.userProfile?.subscribers.filter(
      (s) => s.followerId == loggedInUser.id
    );

    if (userSubscriptions == null) {
      setUserSubscriptions(false);
    } else {
      setUserSubscriptions(true);
    }
  }, [post]);

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
            <Link
              to={
                post.userProfileId != loggedInUser.id
                  ? `/posts/${post.userProfile?.id}/${post.userProfile?.identityUser?.userName}`
                  : null
              }
            >
              {post.userProfile?.identityUser?.userName}
            </Link>
          </CardSubtitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            <Link to={`/posts/${post.id}/comments`}>View Comments</Link>
          </CardSubtitle>
          <CardText>{post.content}</CardText>
          {post?.userProfile?.id == loggedInUser.id ? (
            <>
              <div className="post-btns">
                <Button onClick={toggle}>Manage Tags</Button>
                <Button onClick={() => navigate(`/myposts/edit/${post.id}`)}>Edit Post</Button>
                <Button
                  onClick={() => {
                    setPostToDelete(post.id);
                    setShowConfirmation(true);
                  }}
                >
                  Delete
                </Button>
              </div>

              {showConfirmation && (
                <div className="confirmation-modal">
                  <p>Are you sure you want to delete this post?</p>
                  <button onClick={handleConfirmDelete}>Delete</button>
                  <button onClick={handleCancelDelete}>Cancel</button>
                </div>
              )}
            </>
          ) : (
            <div>
              <button className="btn btn-primary" onClick={toggleCommentForm}>
                {showCommentForm ? "Hide Comment Form" : "Add Comment"}
              </button>
              {showCommentForm && (
                <CommentForm postId={post.id} loggedInUser={loggedInUser} />
              )}
            </div>
          )}
          {userSubscriptions == false ? (
            <Button
              className="post-btns"
              onClick={() => {
                handleSubscribe();
              }}
            >
              Subscribe
            </Button>
          ) : (
            <Button>Unscubscribe</Button>
          )}

          {reactions.map((r) => (
            <div className="reaction-images" key={r.id}>
              <img
                key={r.id}
                id={r.id}
                src={r.image}
                alt="reaction image"
                className="reaction-image"
                onClick={
                  post?.userProfile?.id != loggedInUser.id
                    ? () => {
                        handlePostReaction(r.id);
                      }
                    : null
                }
              />
              <div className="reaction-count">{reactionCounts[r.id]}</div>
            </div>
          ))}
        </CardBody>
        <CardFooter>{formatDate(post.publicationDate)}</CardFooter>
        {/* <CommentButton postId={post.id} /> */}
      </Card>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Choose tags for post</ModalHeader>
        <ModalBody>
          <Form>
            {tags.map((t) => (
              <FormGroup check key={t.id}>
                <Input
                  id={t.id}
                  type="checkbox"
                  value={t.name}
                  checked={tagSelections.includes(t.id)}
                  onChange={() => handleInputChange(t.id)}
                />
                <Label check>{t.tagName}</Label>
              </FormGroup>
            ))}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => handleSubmit(id, tagSelections)}
          >
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

// export const CommentButton = ({ postId, loggedInUser }) => {
//   const [showCommentForm, setShowCommentForm] = useState(false);

//   const toggleCommentForm = () => {
//     setShowCommentForm((prev) => !prev);
//   };

//   return (
//     <div>
//       <button className="btn btn-primary" onClick={toggleCommentForm}>
//         {showCommentForm ? "Hide Comment Form" : "Add Comment"}
//       </button>
//       {showCommentForm && <CommentForm postId={postId} loggedInUser={loggedInUser}  />}
//     </div>
//   );
// };
