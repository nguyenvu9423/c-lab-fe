import { Problem } from './../../../domains/problem/Problem';
import { RoleType } from './../../../domains/role/RoleType';
import { PermissionType } from './../../../domains/role/PermissionType';
import { Selector } from '@reduxjs/toolkit';
import { State } from '../..';
import { PermissionMap } from '../../reducers/authentication';
import { PrincipalSelectors } from './PrincipalSelectors';
import { DataHolderState } from '../../reducers/data-holders/shared';
import { Article } from '../../../domains/article';

export namespace AuthorizationSelectors {
  export function permissions(): Selector<State, PermissionMap | undefined> {
    return (state) => {
      if (DataHolderState.isLoaded(state.authentication)) {
        return state.authentication.token.payload.permissions;
      } else {
        return undefined;
      }
    };
  }

  export function has(permission: string): Selector<State, boolean> {
    return (state) => {
      const pers = permissions()(state);
      if (!pers) return false;
      return !!pers[permission];
    };
  }

  export function canSubmit(): Selector<State, boolean> {
    return (state) => has(PermissionType.SUBMIT)(state);
  }

  export function canCreateProblem(): Selector<State, boolean> {
    return (state) => this.has('CREATE_PROBLEM')(state);
  }

  export function canUpdateProblem(problem: Problem): Selector<State, boolean> {
    return (state) => {
      if (has(PermissionType.UPDATE_ANY_PROBLEM)(state)) return true;

      if (has(PermissionType.UPDATE_OWN_PROBLEM)) {
        const principal = PrincipalSelectors.principal()(state);
        if (principal?.id === problem.author) {
          return true;
        }
      }
      return false;
    };
  }

  export function canCreateArticle(): Selector<State, boolean> {
    return (state) => this.has('CREATE_ARTICLE')(state);
  }

  export function canUpdateArticle(article: Article): Selector<State, boolean> {
    return (state) => {
      if (has(PermissionType.UPDATE_ANY_PROBLEM)(state)) {
        return true;
      }

      if (has(PermissionType.UPDATE_OWN_PROBLEM)(state)) {
        const principal = PrincipalSelectors.principal()(state);
        if (principal?.id === article.author) {
          return true;
        }
      }

      return false;
    };
  }

  export function hasAdminRole(): Selector<State, boolean> {
    return (state) => has(RoleType.ADMIN)(state);
  }
}
