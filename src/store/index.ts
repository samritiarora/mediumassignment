import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})
export const MUTATIONS = {
  "SET_USER": "setUser",
  "SET_USER_JWT": "setUserJwt"
};

export default new Vuex.Store({
  state: {
    session_jwt: '',
    session_username: ''
  },
  mutations: {
    [MUTATIONS.SET_USER_JWT](state, payload) {
      console.log('TRACE: In Store: setting session_jwt to', payload)
      //Vue.set(state, 'session_jwt', payload);
      this.session_jwt = payload;
      console.log('TRACE: In Store: new value for session_jwt', this.session_jwt)
    },
    [MUTATIONS.SET_USER](state, payload) {
      console.log('TRACE: In Store: setting session_username to', payload)
      //Vue.set(state, 'session_username', payload);
      this.session_username = payload;
      console.log('TRACE: In Store: new value for session_username', this.session_username)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin]
});
