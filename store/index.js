import socket from "~/plugins/socket.io.js";

export const strict = false;

export const state = () => ({
  users: [],
});
export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
};
export const actions = {
  add_users({commit}, users) {
    commit("SET_USERS", users);
  },
};
export const getters = {};
