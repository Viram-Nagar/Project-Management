import API from "./axios";

export const getInvites = () => API.get("/invites");
export const inviteResponse = (id, data) => API.patch(`/invites/${id}`, data);
export const inviteRequest = (data) => API.post("/invites", data);
