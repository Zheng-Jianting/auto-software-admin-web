const getDefaultState = () => {
  return {
    avatar: ''
  }
}

const actions = {}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const state = getDefaultState()

export default {
  namespaced: true,
  actions,
  mutations,
  state
}