import axios from "axios";

export const postTrips = attractions =>
  axios.post("http://localhost:3000/v1/user/tour", { attractions });

export const getTrips = _ => {
  return axios.get("http://localhost:3000/v1/user/tour");
};
