import Vue from 'vue'
import Vuex from 'vuex'
import plan from '../api/plan'
import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
  totalTime: 1,
  list: []
}

const getters = {
  getList (state) {
    return state.list
  },
  getTotalTime (state) {
    return state.totalTime
  }
}

const mutations = {
  [types.SAVE_PLAN] (state, { plan }) {
    state.list.push(plan)
  },

  [types.ADD_TOTALTIME] (state, { time }) {
    state.totalTime += time
  },

  [types.DELETE_TOTALTIME] (state, { time }) {
    state.totalTime -= time
  },

  [types.DELETE_PLAN] (state, { pindex }) {
    state.list.splice(pindex, 1)
  },

  [types.GET_ALLPLANS] (state, { plans }) {
    state.list = plans
  }
}

const actions = {
  savePlan ({ commit }, plan) {
    commit(types.SAVE_PLAN, {plan})
  },
  addTotalTime ({ commit, state }, time) {
    commit(types.ADD_TOTALTIME, {time})
  },
  decTotalTime ({ commit, state }, time) {
    commit(types.DELETE_TOTALTIME, {time})
  },
  deletePlan ({ commit, state }, pindex) {
    commit(types.DELETE_PLAN, {pindex})
  },
  getAllPlans ({ commit }) {
    plan.getAllPlans((plans) => {
      commit(types.GET_ALLPLANS, {plans})
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
