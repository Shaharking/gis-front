import axios from "axios";

export const postAttractions = attractions =>
  axios.post("http://localhost:3000/v1/user/tour", { attractions });