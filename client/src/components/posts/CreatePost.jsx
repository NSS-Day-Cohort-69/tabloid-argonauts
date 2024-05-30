import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getAllCategories } from "../../managers/categoryManager.js";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../managers/postManager.js";

export default function CreatePost({ loggedInUser }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      headerImage,
      category,
    };

    createPost(newPost).then(() => {
      navigate("/posts");
    });
  };

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <>
      <h2>Create A Post</h2>
      <Form>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Content</Label>
          <Input
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Header Image URL</Label>
          <Input
            type="text"
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
            value={category}
            onChange={(e) => {
              setCategory(parseInt(e.target.value));
            }}
          >
            <option value={0}>Choose a Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{`${c.categoryName}`}</option>
            ))}
          </Input>
        </FormGroup>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  );
}
