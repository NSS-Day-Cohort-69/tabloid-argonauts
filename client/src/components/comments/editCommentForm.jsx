import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCommentsByPostId, updateComment } from "../../managers/commentManager";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const EditComment = () => {
    const { id, commentId } = useParams();
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchComment = async () => {
            try {
                const commentData = await getCommentsByPostId(id);
               
                setSubject(commentData.subject);
                setContent(commentData.content);
            } catch (error) {
                console.error("Error fetching comment:", error);
            }
        };

        fetchComment();
    }, [commentId]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateComment(commentId, { subject, content });
            navigate(`/posts/${id}/comments`); 
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleCancel = () => {
        navigate(`/posts/${id}/comments`) 
    };

    return (
        <div>
            <h1>Edit Comment</h1>
            <Form onSubmit={handleSave}>
                <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input type="text" name="subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="content">Content</Label>
                    <Input type="textarea" name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
                </FormGroup>
                <Button color="primary" type="submit">Save</Button>{' '}
                <Button color="secondary" onClick={handleCancel}>Cancel</Button>
            </Form>
        </div>
    );
};

export default EditComment;
