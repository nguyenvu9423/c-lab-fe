import { User } from './../../../domains/user/User';
import { UserSelectors } from '../UserSelectors';
import { LoadingState } from '../../common';
import { State } from '../..';
import { Selector } from '@reduxjs/toolkit';
import { DataHolder } from '../../reducers/data-holders/shared';

export namespace PrincipalSelectors {
  export function isInitialized(): Selector<State, boolean> {
    return (state) => {
      const { loadingState } = state.principal;
      return LoadingState.isDone(loadingState);
    };
  }

  export function principal(): Selector<State, User | undefined> {
    return (state) => {
      const id = DataHolder.isLoaded(state.principal)
        ? state.principal.id
        : undefined;
      return id ? UserSelectors.selectById(id)(state) : undefined;
    };
  }

  export function isPrincipal(user: User): Selector<State, boolean> {
    return (state) => {
      const id = DataHolder.isLoaded(state.principal)
        ? state.principal.id
        : undefined;
      return id === user.id;
    };
  }

  // TODO: fix any here
  export function principalDataHolder(): Selector<State, any> {
    return (state) => {
      const principalDataHolder = state.principal;
      if (principalDataHolder.loadingState === LoadingState.LOADED) {
        return {
          ...principalDataHolder,
          principal: UserSelectors.selectById(principalDataHolder.id)(state),
        };
      }
      return principalDataHolder;
    };
  }
}
