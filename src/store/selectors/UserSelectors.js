export const UserSelectors = {
  byIds(ids) {
    return state => ids.map(id => state.entities.user[id]);
  },
  loginUser() {
    return state => {
      const id = state.login.loginUser;
      return UserSelectors.byId(id)(state);
    };
  },
  byId(id) {
    return state => state.entities.user[id];
  }
};
