import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["favoritePeopleId"]
    })
  ],
  state: {
    isloadingData: false,
    count: null,
    people: [],
    favoritePeople: [],
    favoritePeopleId: []
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count = payload;
    },
    SET_LOADING_DATA(state, payload) {
      state.isloadingData = payload;
    },
    SET_FAVORITE_PEOPLE_ID(state, payload) {
      if (state.favoritePeopleId.includes(payload)) {
        const index = state.favoritePeopleId.indexOf(payload);
        if (index > -1) {
          state.favoritePeopleId.splice(index, 1);
        }
      } else {
        state.favoritePeopleId.push(payload);
      }
    },
    SET_FAVORITE_PEOPLE(state, payload) {
      if (payload.length === 0) {
        state.favoritePeople = [];
      } else {
        state.favoritePeople.push(payload);
      }
    },
    SET_PEOPLE(state, payload) {
      state.people = payload;
    }
  },
  actions: {
    async getPeople({ commit }, payload) {
      await axios
        .get(`/people/`, {
          params: {
            page: payload.page,
            search: payload.name
          }
        })
        .then(response => {
          commit("SET_PEOPLE", response.data.results);
          commit("SET_COUNT", response.data.count);
        });
    },
    async getPeopleById({ commit }) {
      const vuexStorage = localStorage.getItem("vuex");
      let vuexStorageParse = JSON.parse(vuexStorage);
      const arrayFavoritePeopleId = vuexStorageParse.favoritePeopleId;
      for (let i = 0; i < arrayFavoritePeopleId.length; i++) {
        await axios
          .get(`/people/${arrayFavoritePeopleId[i]}/`)
          .then(response => {
            commit("SET_FAVORITE_PEOPLE", response.data);
          });
      }
    }
  },
  getters: {
    getFavoritePeople(state) {
      let favoritePeopleSerialized = state.favoritePeople.map(e =>
        JSON.stringify(e)
      );
      const uniqueFavoritePeopleSerialized = [
        ...new Set(favoritePeopleSerialized)
      ];
      let uniqueFavoritePeople = uniqueFavoritePeopleSerialized.map(e =>
        JSON.parse(e)
      );
      return uniqueFavoritePeople;
    },
    getPeopleData(state) {
      const peopleData = state.people.map(item => {
        const url = new URL(`${item.url}`);
        let res = url.pathname.split("/");
        return {
          ...item,
          id: Number(res[3]),
          favorite: false
        };
      });

      const vuexStorage = localStorage.getItem("vuex");
      let vuexStorageParse = JSON.parse(vuexStorage);
      const arrayFavoritePeopleId = vuexStorageParse.favoritePeopleId;
      peopleData.forEach(item => {
        if (arrayFavoritePeopleId.includes(item.id)) {
          item.favorite = true;
        } else {
          item.favorite = false;
        }
      });
      return peopleData;
    }
  }
});
