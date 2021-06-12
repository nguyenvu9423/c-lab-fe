import { LoadingState } from '../common';

export const AuthenticationSelectors = {
  // return boolean || undefined
  isAuthenticated() {
    return state => {
      const { loadingState } = state.authentication;
      switch (loadingState) {
        case LoadingState.LOADED:
          return true;
        case LoadingState.WITHOUT:
        case LoadingState.ERROR:
          return false;
        default:
          return undefined;
      }
    };
  },

  permissions() {
    return state => {
      const isAuthenticated = this.isAuthenticated()(state);
      if (isAuthenticated) {
        const permissions = state.authentication.token.payload.authorities;
        return permissions;
      } else {
        return [];
      }
    };
  }
};

export const PermissionSelectors = {
  permissions() {
    return state => state.authentication.token?.payload.permissions;
  },

  has(permission) {
    return state => {
      const permissions = this.permissions()(state);
      return permissions ? !!permissions[permission] : undefined;
    };
  },

  canCreateProblem() {
    return state => this.has('CREATE_PROBLEM')(state);
  },

  canCreateArticle() {
    return state => this.has('CREATE_ARTICLE')(state);
  },

  canSubmit() {
    return state => this.has('SUBMIT')(state);
  },

  hasAdminRole() {
    return state => this.has('ROLE_ADMIN')(state);
  }
};
