import API from "./axios";

export const getUsers = () => API.get("/user");
export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);
export const logoutUser = () => API.get("/logout");
