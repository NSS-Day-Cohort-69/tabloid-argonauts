import { useEffect, useState } from "react"
import { Tags } from "./Tags"
import { DeleteTag, GetAllTags } from "../../managers/TagManager"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"

export const TagsList = () => {
    const [tags, setTags] = useState([])
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const getAndSetTags = () => {
        GetAllTags().then(setTags)
    }

    const handleEditClick = (e) => {
        const id = e.currentTarget.parentNode.id;
        navigate(`/tags/${id}`)
    };
    
    const handleDeleteClick = (e) => {
        const id = e.currentTarget.parentNode.id;
        DeleteTag(id).then(setRefresh(!refresh))
    };

    useEffect(() => {
        getAndSetTags();
    }, [refresh])

    //plan: delete and edit need IDs. Can I use the key?
    //Chatgpt says yes. Chatgpt is based.

    return (
        <div className="tags-container">
            <Button
                onClick={() => navigate("/tags/create")}
            >
                Create new Tag
            </Button>
            <article className="tags">
                {tags.map(t => {
                    return (
                        <div key={t.id} id={t.id}>
                            <Tags
                                tag={t}
                            />
                            <Button onClick={handleEditClick}>Edit</Button>
                            <Button onClick={handleDeleteClick}>Delete</Button>
                        </div>
                    )
                })}
            </article>
        </div>
    )
}