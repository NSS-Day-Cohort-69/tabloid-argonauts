import { useState, useEffect } from "react";
import { getPosts } from "../../managers/postManager";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";



const MyPostList = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsData = await getPosts();
                const userPosts = postsData
                    .filter(post => post.userProfileId === loggedInUser.id)
                    .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                setPosts(userPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, [loggedInUser]);

    return (
        <>
            <h1>Posts List</h1>
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
                                navigate(`/api/posts/${p.id}`);
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

export default MyPostList;
