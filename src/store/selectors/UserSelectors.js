export const UserSelectors = {
  loginUser() {
    return state => {
      const id = state.login.loginUser;
      return UserSelectors.userById(id)(state);
    };
  },
  userById(id) {
    return state => {
      return state.entities.user[id];
    };
  }
};
