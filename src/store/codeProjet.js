// store/modules/project.js
const state = {
    codeProjet: ''
  };
  
  const getters = {
    getCodeProjet: (state) => state.codeProjet
  };
  
  const mutations = {
    SET_CODE_PROJET(state, code) {
      state.codeProjet = code;
    }
  };
  
  const actions = {
    setCodeProjet({ commit }, code) {
      commit('SET_CODE_PROJET', code);
    }
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
  