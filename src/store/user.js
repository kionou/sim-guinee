// store/modules/user.js
import { isTokenExpired } from '@/functions/util.js';


const state = {
    loggedInUser: null,
  };
  const getters = {
    loggedInUser: (state) => state.loggedInUser,
    isLoggedIn: (state) => state.loggedInUser !== null,
  };  
  
  const mutations = {
    SET_LOGGED_IN_USER(state, user) {
      state.loggedInUser = user;
    },
    CLEAR_LOGGED_IN_USER(state) {
      state.loggedInUser = null;
    },
  };
  
  const actions = {
    setLoggedInUser({ commit }, user) {
      const now = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
      const tokenExpiration = now + user.expires_in; // Calcul de l'expiration du token
      const userSessionData = {
        id: user.user.Entreprises || user.user.Identifiant ,
        nom:user.user.Nom,
        prenom:user.user.Prenoms,
        email:user.user.email,
        whatsapp:user.user.Whatsapp,
        token: user.access_token,
         tokenExpiration: tokenExpiration,
      };

      commit('SET_LOGGED_IN_USER', userSessionData );
      localStorage.setItem('loggedInUserData', JSON.stringify(userSessionData));
    },
      clearLoggedInUser({ commit }) {
       commit('CLEAR_LOGGED_IN_USER');
      localStorage.removeItem('loggedInUserData');
    },
    loadLoggedInUser({ commit }) {
      const storedUserData =  localStorage.getItem('loggedInUserData');
      if (storedUserData) {
        const data = JSON.parse(storedUserData)
        console.log('data',data);
          if (!isTokenExpired(data.tokenExpiration)) {
        commit('SET_LOGGED_IN_USER', JSON.parse(storedUserData));
        console.log('User data has been set');
      } else {
        commit('CLEAR_LOGGED_IN_USER');
        localStorage.removeItem('loggedInUserData');
      }
      }
    },
  };

  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
  