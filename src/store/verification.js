// store/verification.js

const state = {
    verificationCode: null, // Stockez le code de vérification ici
  }
  
  const mutations = {
    setVerificationCode(state, code) {
      state.verificationCode = code;
    },
    clearVerificationCode(state) {
      state.verificationCode = null;
    },
  }
  
  const actions = {
    saveVerificationCode({ commit }, code) {
        console.log('codeeee',code);
      commit('setVerificationCode', code);
    },
    clearVerificationCode({ commit }) {
      commit('clearVerificationCode');
    },
  }
  const getters = {
    getVerificationCode: (state) => state.verificationCode,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  