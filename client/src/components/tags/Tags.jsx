

export const Tags = ({ tag }) => {
    return (
        <section className="tag">
            <div className="tag-info">
                Tag Id: {tag.id}
            </div>
            <div className="tag-info">
                Tag Name: {tag.tagName}
            </div>
        </section>
    )
}