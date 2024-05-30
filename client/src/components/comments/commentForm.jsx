import React, { useState } from "react";
import { createComment } from "../../managers/commentManager";
import { useNavigate } from "react-router-dom";

const CommentForm = ({ postId }) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentDTO = {
        subject,
        content,
        postId,
        dateOfComment: new Date().toISOString(),
      };
      await createComment(commentDTO);
      navigate(`/posts/${postId}/comments`);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <>
      <h2>Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CommentForm;
