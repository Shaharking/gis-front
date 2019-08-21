import mutations from "./mutations";
import * as getters from "./getters";
import * as actions from "./actions";

const state = {
  user: {
    email: undefined,
    name: undefined,
    token: undefined
  },
  header: {
    title: "地图",
    rightOption: {
      show: true,
      name: "Cities",
      link: "cities"
    },
    leftOption: {}
  },

  menuState: "main_menu",

  tripAttractions: [],
  categories: [],
  attractions: [],
  direction: "forward",

  mapCityName: "Tel Aviv-Yafo",

  selectedNames: ["Tel Aviv-Yafo", "Bat Yam", "Rehovot"],

  cities: [
    { name: "Tel Aviv-Yafo", coordinates: [32.109333, 34.855499] },
    { name: "Ra'anana", coordinates: [32.184448, 34.870766] },
    { name: "Bethlehem", coordinates: [31.705791, 35.200657] },
    { name: "Ashdod", coordinates: [31.801447, 34.643497] },
    { name: "Nazareth", coordinates: [32.699635, 35.303547] },
    { name: "Bat Yam", coordinates: [32.017136, 34.745441] },
    { name: "Haifa", coordinates: [32.794044, 34.989571] },
    { name: "Karmiel", coordinates: [32.919945, 35.290146] },
    { name: "Herzliya", coordinates: [32.166313, 34.843311] },
    { name: "Rehovot", coordinates: [31.894756, 34.809322] }
  ],

  now: {
    cityName: "Shenzhen",
    text: "Sunny",
    temperature: 20,
    code: "14"
  },
  future: [
    {
      day: "今日",
      date: "2017-05-13",
      code_day: "1",
      code_night: "2",
      high: 25,
      low: 20
    },
    {
      day: "明天",
      date: '"2017-05-14"',
      code_day: "1",
      code_night: "2",
      high: 25,
      low: 20
    },
    {
      day: "后天",
      date: '"2017-05-15"',
      code_day: "1",
      code_night: "2",
      high: 25,
      low: 20
    }
  ]
};

export default {
  state,
  mutations,
  getters,
  actions
};
