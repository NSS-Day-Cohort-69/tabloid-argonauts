import { useState, useEffect } from "react";
import { getPosts } from "../../managers/postManager";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import "./posts.css";

export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((arr) => setPosts(arr));
  }, [searchTerm]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const clearSearchFilters = () => {
    getPosts().then((arr) => setPosts(arr));
  };

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getPosts(searchTerm).then(setPosts);
  };

  const handleCategoryInputChange = (event) => {
    const selectedCategoryId = event.currentTarget.getAttribute("value");
    setCategorySearch(selectedCategoryId);
    getPosts("", parseInt(selectedCategoryId)).then(setPosts);
  };
  return (
    <>
      <div>
        <Form inline onSubmit={handleSearchSubmit}>
          <FormGroup>
            <Label for="search" hidden>
              Search
            </Label>
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Search by tag"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </FormGroup>
          <Button type="submit">Search</Button>
        </Form>
      </div>
      <div className="search-controls">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Sort By Category</DropdownToggle>
          <DropdownMenu>
            {categories.map((c) => (
              <DropdownItem
                key={c.id}
                value={c.id}
                onClick={handleCategoryInputChange}
              >
                {c.categoryName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button
          onClick={() => {
            clearSearchFilters();
          }}
        >
          Clear filters
        </Button>
      </div>
      {posts.map((p) => (
        <Card
          key={p.id}
          style={{
            width: "10rem",
          }}
        >
          <CardBody>
            <CardTitle tag="h5">{p.title}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {p.userProfile?.fullName}
            </CardSubtitle>
            <CardText>{p.category?.categoryName}</CardText>
            <Button
              onClick={() => {
                navigate(`/posts/${p.id}`);
              }}
            >
              View Post
            </Button>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
