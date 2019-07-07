import axios from "axios";

export const getAttractions = () =>
  axios.get(`http://localhost:3000/v1/attraction`);
