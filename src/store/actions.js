import { makeAction } from "../utils/actionTools";
import * as types from "./mutation-types";
import { getNowWeather, getFutureWeather } from "@/api/getWeather";
import { getAttractions } from "@/api/attractions";
import { getCategories } from "@/api/category";
import { login, register } from "@/api/user";
import { postAttractions } from "@/api/trip";

export const changeMapCity = makeAction(types.CHANGE_MAP_CITY);

export const changeWeatherCity = makeAction(types.CHANGE_WEATHER_CITY);

export const deleteCity = makeAction(types.DELETE_CITY);

export const toggleCity = makeAction(types.TOGGLE_CITY);

export const updateDirction = makeAction(types.UPDATE_DIRECTION);

export const loadNowWeather = ({ commit, state }) => {
  getNowWeather({
    location: state.now.cityName,
    language: "zh-Hans",
    unit: "c"
  }).then(res => {
    commit("SET_NOW_WEATHER", res.data.results[0].now);
  });
};

export const loadDailyWeather = ({ commit, state }) => {
  getFutureWeather({
    location: state.now.cityName,
    language: "zh-Hans",
    unit: "c",
    start: 0,
    days: 5
  }).then(res => {
    commit("SET_FUTURE_WEATHER", res.data.results[0].daily);
  });
};

export const setMenuState = ({ commit, state }, payload) => {
  commit("SET_MENU", payload);
};

export const emptyTripAttraction = ({ commit, state }) => {
  commit("CLEAN_TRIPATTRACTION");
};

export const deleteSpecificAttraction = ({ commit, state }, payload) => {
  commit("DELETE_ATTRACION", payload);
};

export const fetchAttractions = ({ commit, state }) => {
  getAttractions().then(res => {
    commit("SET_ATTRACTIONS", res.data);
  });
};

export const fetchCategories = ({ commit, state }) => {
  getCategories().then(res => {
    commit("SET_CATEGORIES", res.data);
  });
};

export const addTripAttraction = ({ commit, state }, payload) => {
  commit("PUSH_TRIP_ATTRACTION", payload);
};

export const userLogin = ({ commit, state }, payload) =>
  login(payload)
    .then(res => {
      commit("SET_USER", res.data);
      return res.data;
    })
    .catch(err => {
      throw err;
    });

export const userLogout = ({ commit, state }) => {
  commit("SET_USER", null);
};

export const userRegister = ({ commit, state }, payload) =>
  register(payload)
    .then(res => {
      commit("SET_USER", res.data);
      return res.data;
    })
    .catch(err => {
      throw err;
    });

export const createTrip = ({ commit, state }, trips) => {
  return postAttractions(trips)
    .then(res => res.data)
    .catch(err => {
      console.error(err);
    });
};
