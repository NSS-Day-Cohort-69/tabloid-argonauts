import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { editPost, getPostById } from "../../managers/postManager.js";
import { getAllCategories } from "../../managers/categoryManager.js";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
        const fetchPost = async () => {
            try {
              const postData = await getPostById(postId);
      
              setTitle(postData.title);
              setContent(postData.content);
              setHeaderImage(postData.headerImage);
              setCategory(postData.category);
            } catch (error) {
              console.error("Error fetching this post:", error);
            }
          };
          
          fetchPost();
    }
}, [postId]);

useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await editPost(postId, {title, content, headerImage, categoryId: category})
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error updating this post:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <Form onSubmit={handleSave}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <Input
            type="text"
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Header Image URL</Label>
          <Input
            type="text"
            name="headerImage"
            id="headerImage"
            value={headerImage}
            onChange={(e) => {
              setHeaderImage(e.target.value);
            }}
          />
        </FormGroup>
          <FormGroup>
          <Label>Category</Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(parseInt(e.target.value));
            }}
          >
            <option value={0}>Choose a New Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{`${c.categoryName}`}</option>
            ))}
          </Input>
        </FormGroup>
        <Button color="primary" type="submit">
          Save
        </Button>
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditPost;
