import { useState } from "react";
import { PostTag } from "../../managers/TagManager";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


export const CreateTagForm = () => {
    const [tagName, setTagName] = useState("");
    const navigate = useNavigate();

    const submit = () => {
        const newTag = {
            tagName
        }
        PostTag(newTag).then(() => {
            navigate("/tags")
        })
    }

    return (
        <div className="container">
            <h4>Add a new tag!</h4>
            <Form>
                <FormGroup>
                    <Label>Tag Name</Label>
                    <Input
                        type="text"
                        onChange={(e) => {setTagName(e.target.value)}}
                    />
                </FormGroup>
                <Button
                    onClick={submit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}