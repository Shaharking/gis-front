import axios from "axios";

export const login = ({ email, password }) =>
  axios.post("http://localhost:3000/v1/login", { email, password });

export const register = ({ email, password }) =>
  axios.post("http://localhost:3000/v1/register", {
    email,
    password
  });
