import { useState, useEffect } from "react";
import { getCommentsByPostId } from "../../managers/commentManager";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { useParams } from "react-router-dom";

const ViewComments = () => {
    const [comments, setComments] = useState([]);
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
                            </CardBody>
                        </Card>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ViewComments;