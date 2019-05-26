import { makeAction } from "../utils/actionTools";
import * as types from "./mutation-types";
import { getNowWeather, getFutureWeather } from "@/api/getWeather";
import { getAttractions } from "@/api/attractions";
import { getCategories } from "@/api/category";

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
