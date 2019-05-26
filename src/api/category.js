import axios from "axios";

export const getCategories = () =>
  axios.get(`http://localhost:3000/v1/category`);
