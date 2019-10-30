import axios from "axios";

export const postTrips = attractions =>
  axios.post("http://localhost:3000/v1/user/tour", { attractions });

export const getTrips = _ => {
  return axios.get("http://localhost:3000/v1/user/tour");
};

export const createPriceOffterTrip = offer => {
    return axios.post("http://localhost:3000/v1/user/tripOffers", offer);
}

export const createTripOrder = order => {
    return axios.post("http://localhost:3000/v1/user/tripOffers/order", order);
}