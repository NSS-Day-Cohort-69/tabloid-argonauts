const _apiUrl = "/api/tag";

export const GetAllTags = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const PostTag = (t) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t)
    })
}

export const EditTag = (t) => {
    return fetch(`${_apiUrl}/${t.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(t)
    })
}

export const DeleteTag = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(id)
    })
}