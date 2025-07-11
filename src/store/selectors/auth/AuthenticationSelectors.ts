import { Selector } from '@reduxjs/toolkit';
import { Jwt } from '@/utils';
import { State } from '../../state';
import { LoadingState } from '../../common';
import { DataHolder } from '../../reducers/data-holders/shared';

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

  export function username(): Selector<State, string | undefined> {
    return (state) => {
      if (DataHolder.isLoaded(state.authentication)) {
        return state.authentication.accessTokenPayload.sub;
      }
    };
  }

  export function token(): Selector<State, Jwt | undefined> {
    return (state) => {
      const { authentication } = state;
      if (DataHolder.isLoaded(authentication)) {
        return authentication.token;
      }
      return undefined;
    };
  }
}
