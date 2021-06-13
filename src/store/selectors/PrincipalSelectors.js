import { UserSelectors } from './UserSelectors';
import { LoadingState } from '../common';

export const PrincipalSelectors = {
  isInitialized() {
    return (state) => {
      const { loadingState } = state.principal;
      return LoadingState.isDone(loadingState);
    };
  },

  principal() {
    return (state) => {
      const id = state.principal.id;
      return id ? UserSelectors.byId(id)(state) : undefined;
    };
  },

  principalDataHolder() {
    return (state) => {
      const principalDataHolder = state.principal;
      if (principalDataHolder.loadingState === LoadingState.LOADED) {
        return {
          ...principalDataHolder,
          principal: UserSelectors.byId(principalDataHolder.id)(state),
        };
      }
      return principalDataHolder;
    };
  },
};
