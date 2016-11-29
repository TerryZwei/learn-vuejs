import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
// import types from './mutation-types';

Vue.use(Vuex);

const mutations = {

};

export default new Vuex.Store({
  actions,
  getters,
  mutations,
});
