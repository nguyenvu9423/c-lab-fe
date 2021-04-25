import { UserSelectors } from './UserSelectors';

export const AuthenticationSelectors = {
  principal() {
    return state => {
      const id = state.authentication.user.id;
      return UserSelectors.byId(id)(state);
    };
  }
};
