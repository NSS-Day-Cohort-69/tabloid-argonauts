import { useState, useEffect } from "react";
import { getPosts } from "../../managers/postManager";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../tags/SearchBar";



export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((arr) => setPosts(arr));
  }, []);

  useEffect(() => {
    setFilteredPosts(posts)
  }, [posts])

  useEffect(() => {
    const foundPosts = posts.filter(post => 
      post.postTags && post.postTags.some(pt => 
        pt.tag.tagName && pt.tag.tagName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPosts(foundPosts)
  }, [searchTerm])

  return (
    <div>
      <SearchBar
        setSearchTerm={setSearchTerm}
      />
      <h1>Posts List</h1>
      {filteredPosts.map((p) => (
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
    </div>
  );
};
