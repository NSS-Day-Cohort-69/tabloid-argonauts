import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getAllCategories } from "../../managers/categoryManager.js";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../managers/postManager.js";

const CreatePost = ({ loggedInUser }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {

    e.preventDefault();
    const newPost = {
    Title: title,
    Content : content,
    HeaderImage : headerImage,
    CategoryId : category,
    UserProfileId : loggedInUser.id,
    IsApproved : false,
    CreationDate : new Date()
    };

    console.log("Creating new post with payload:", newPost);

    try {
      const createdPost = await createPost(newPost);
      navigate(`/posts/${createdPost.id}`)
    }
    catch (error) {
      console.error("Error creating post:" , error)
    }
  };

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <>
      <h2>Create A Post</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default CreatePost;