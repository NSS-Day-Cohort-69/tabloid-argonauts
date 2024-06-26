const _apiUrl = "/api/subscription";

export const NewSubscription = (subscription) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  }).then((res) => res.json());
};

export const getSubscriptions = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getUserSubscriptions = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const Unsubscribe = (subscription) => {
  return fetch(_apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
};
