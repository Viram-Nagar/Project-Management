import API from "./axios";

export const getComments = (id) => API.get(`/comments/${id}`);
export const postComment = (id, data) => API.post(`/comments/${id}`, data);
