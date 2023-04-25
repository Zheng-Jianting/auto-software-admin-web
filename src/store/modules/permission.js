const actions = {}

const mutations = {
  SET_USER: function(state, value) {
    state.user = value
    localStorage.setItem('user', value)
  },
  SET_TOKEN: function(state, value) {
    state.token = value
    localStorage.setItem('token', value)
  },
  SET_ROLE_PERMISSION: function(state, value) {
    state.rolePermission = value
    localStorage.setItem('rolePermission', value)
  }
}

const state = {
  user: {},
  token: '',
  rolePermission: localStorage.getItem('rolePermission') || []
}

export default {
  actions,
  mutations,
  state
}