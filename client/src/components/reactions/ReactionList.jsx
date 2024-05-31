import { useState, useEffect } from "react";
import { GetReactions } from "../../managers/reactionManager";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import "./reaction.css";
import { useNavigate } from "react-router-dom";
export const ReactionList = () => {
  const [reactions, setReactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetReactions().then((arr) => setReactions(arr));
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          navigate(`/reactions/create`);
        }}
      >
        Create Reaction
      </Button>
      <div className="reactions-list">
        {reactions.map((p) => (
          <Card
            key={p.id}
            style={{
              width: "10rem",
            }}
          >
            <img alt="Sample" src={p.image} />
            <CardBody>
              <CardTitle tag="h5">{p.name}</CardTitle>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};
