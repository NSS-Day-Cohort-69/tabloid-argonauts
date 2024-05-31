const _apiUrl = "/api/reaction";

export const GetReactions = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const CreateNewReaction = (reaction) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reaction),
  }).then((res) => res.json);
};
