import { Selector } from '@reduxjs/toolkit';
import { State } from '../..';
import { LoadingState } from '../../common';

export namespace AuthenticationSelectors {
  export function isAuthenticated(): Selector<State, boolean> {
    return (state) => {
      const { loadingState } = state.authentication;
      switch (loadingState) {
        case LoadingState.LOADED:
          return true;
        case LoadingState.WITHOUT:
        case LoadingState.ERROR:
          return false;
        default:
          return false;
      }
    };
  }

  export function permissions(): Selector<State, any> {
    return (state) => {
      if (isAuthenticated()(state)) {
        // @ts-ignore
        const permissions = state.authentication.token.payload.authorities;
        return permissions;
      } else {
        return [];
      }
    };
  }
}
