// src/services/authService.js
import api from "./api";

export const registerUser = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/logout");
  return res.data;
};

export const fetchUser = async () => {
  const res = await api.get("/user");
  return res.data;
};
