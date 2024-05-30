import { useState } from "react";
import { EditTag } from "../../managers/TagManager";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


export const EditTagForm = () => {
    const [tagName, setTagName] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const submit = () => {
        const newTag = {
            id,
            tagName
        }
        EditTag(newTag).then(() => {
            navigate("/tags")
        })
    }

    return (
        <div className="container">
            <h4>Edit tag #{id}!</h4>
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
                >Submit
                </Button>
            </Form>
        </div>
    )
}