const state = {
  routes: []
}

const mutations = {
  SET_ROUTES (state, routes) {
    state.routes = routes
  }
}

const actions = {
  generateRoutes ({ commit }, routes) {
    return new Promise((resolve, reject) => {
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
