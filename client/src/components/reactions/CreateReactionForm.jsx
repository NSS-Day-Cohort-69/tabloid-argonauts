import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { CreateNewReaction } from "../../managers/reactionManager";

export const CreateReactionForm = () => {
  const [reactionName, setReactionName] = useState("");
  const [reactionImage, setReactionImage] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    debugger;
    const newReaction = {
      name: reactionName,
      image: reactionImage,
    };
    CreateNewReaction(newReaction).then(() => {
      navigate("/reactions");
    });
  };

  return (
    <div className="container">
      <h4>Add a new reaction!</h4>
      <Form>
        <FormGroup>
          <Label>Reaction Name</Label>
          <Input
            type="text"
            onChange={(e) => {
              setReactionName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Reaction Image</Label>
          <Input
            type="text"
            onChange={(e) => {
              setReactionImage(e.target.value);
            }}
          />
        </FormGroup>
        <Button onClick={submit}>Submit</Button>
      </Form>
    </div>
  );
};
