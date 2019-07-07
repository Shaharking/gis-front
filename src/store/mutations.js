import * as types from "./mutation-types";

export default {
  [types.SET_HEADER](state, header) {
    state.header = header;
  },

  [types.CHANGE_MAP_CITY](state, name) {
    state.mapCityName = name;
  },

  [types.CHANGE_WEATHER_CITY](state, name) {
    state.now.cityName = name;
  },

  [types.DELETE_CITY](state, name) {
    const start = state.selectedNames.indexOf(name);
    state.selectedNames.splice(start, 1);
  },

  [types.TOGGLE_CITY](state, name) {
    if (state.selectedNames.includes(name)) {
      const start = state.selectedNames.indexOf(name);
      state.selectedNames.splice(start, 1);
    } else {
      state.selectedNames.push(name);
    }
  },

  [types.UPDATE_DIRECTION](state, payload) {
    state.direction = payload.direction;
  },

  [types.SET_NOW_WEATHER](state, now) {
    state.now = Object.assign(state.now, now);
  },

  [types.SET_FUTURE_WEATHER](state, future) {
    state.future = future;
    state.future[0].day = "今日";
    state.future[1].day = "明天";
    state.future[2].day = "后天";
  },

  [types.SET_CATEGORIES](state, categories) {
    state.categories = categories;
  },
  [types.SET_ATTRACTIONS](state, attractions) {
    const categories = state.categories.reduce((acc, p) => {
      acc[p.id] = p.category_name;
      return acc;
    }, {});
    state.attractions = attractions.map(attraction => {
      const location = attraction.Location;
      attraction["position"] = [location.lat, location.lng];
      attraction["category"] = categories[attraction.id_category];
      return attraction;
    });
  },
  [types.SET_USER](state, user) {
    state.user = user;
  }
};
