import { useState, useEffect } from "react";
import { getCommentsByPostId } from "../../managers/commentManager";
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { deleteComment } from "../../managers/commentManager";
import { useNavigate } from "react-router-dom";
import EditComment from "./editCommentForm";
import { Link } from "react-router-dom";


const ViewComments = ({loggedInUser}) => {
    const [comments, setComments] = useState([]);
    const [editCommentId, setEditCommentId] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commentsData = await getCommentsByPostId(id);
                
                setComments(commentsData);

            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteComment(commentId);
                setComments(comments.filter(comment => comment.id !== commentId));
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    };

    const navigate = useNavigate();

    const postId = id;
   

    const handleEdit = (commentId) => {
        navigate(`/posts/${postId}/comments/edit/${commentId}`);
    };
    

    return (
        <>
            <h1>Comments List</h1>
            {comments.length === 0 ? (
                <p>No comments available.</p>
            ) : (
                <ul>
                    {comments.map(comment => (
                        <Card key={comment.id} style={{ marginBottom: "1rem" }}>
                            <CardBody>
                                <CardTitle tag="h5">{comment.subject}</CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6">
                                    By: {comment.userProfile.fullName}
                                </CardSubtitle>
                                <CardText>{comment.content}</CardText>
                                <CardText>
                                    <small className="text-muted">
                                        Commented on: {new Date(comment.dateOfComment).toLocaleDateString()}
                                    </small>
                                </CardText>
                                {comment.userProfile.id === loggedInUser.id && (
                                    <>
                                        <Button color="info" onClick={() => handleEdit(comment.id)}>Edit</Button>{' '}
                                    </>
                                    )}
                                      {comment.userProfile.id === loggedInUser.id || loggedInUser.roles == 'Admin' && (
                                     <Button color="danger" onClick={() => handleDelete(comment.id)}>Delete</Button>
                                     )}  
                                    
                            </CardBody>
                        </Card>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ViewComments;