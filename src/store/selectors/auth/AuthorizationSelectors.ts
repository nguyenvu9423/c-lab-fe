import { Selector } from '@reduxjs/toolkit';

import { PermissionType, RoleType } from '@/domains/role';
import { Article } from '@/domains/article';
import { PrincipalSelectors } from './PrincipalSelectors';
import { State } from '../../state';
import { PermissionMap } from '../../reducers/authentication';
import { DataHolderState } from '../../reducers/data-holders/shared';
import { EntityRef } from '../../../shared/types';
import { ContestRegistrationSelectors } from '../ContestRegistrationSelectors';

export namespace AuthorizationSelectors {
  export function canCreateArticle(): Selector<State, boolean> {
    return (state) => has('CREATE_ARTICLE')(state);
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

  export function canCreateProblem(): Selector<State, boolean> {
    return (state) => has('CREATE_PROBLEM')(state);
  }

  export function canUpdateProblem(problem: {
    author: EntityRef;
  }): Selector<State, boolean> {
    return (state) => {
      if (has(PermissionType.UPDATE_ANY_PROBLEM)(state)) return true;
      const authorId = EntityRef.getId(problem.author);

      if (has(PermissionType.UPDATE_OWN_PROBLEM)) {
        const principal = PrincipalSelectors.principal()(state);
        if (principal?.id === authorId) {
          return true;
        }
      }
      return false;
    };
  }

  export function canSubmit(): Selector<State, boolean> {
    return (state) => has(PermissionType.SUBMIT)(state);
  }

  export function canReadSubDetails(sub: {
    user: EntityRef;
    problem: { author: EntityRef };
  }): Selector<State, boolean> {
    return (state) => {
      const principal = PrincipalSelectors.principal()(state);
      const userId = EntityRef.getId(sub.user);

      if (principal?.id === userId) {
        return true;
      }
      if (canUpdateProblem(sub.problem)(state)) {
        return true;
      }
      return false;
    };
  }

  export function canUpdateSubmission(sub: {
    problem: { author: EntityRef };
  }): Selector<State, boolean> {
    return (state) => {
      return canUpdateProblem(sub.problem)(state);
    };
  }

  export function canCreateContest(): Selector<State, boolean> {
    return (state) => has(PermissionType.CREATE_CONTEST)(state);
  }

  export function canUpdateContest(contest: {
    author: EntityRef;
  }): Selector<State, boolean> {
    return (state) => {
      if (has(PermissionType.UPDATE_ANY_CONTEST)(state)) return true;
      const authorId = EntityRef.getId(contest.author);

      if (has(PermissionType.UPDATE_OWN_CONTEST)) {
        const principal = PrincipalSelectors.principal()(state);
        if (principal?.id === authorId) {
          return true;
        }
      }
      return false;
    };
  }

  export function canCreateContestSubmission(
    contestId: number,
  ): Selector<State, boolean> {
    return (state) => {
      if (!has(PermissionType.SUBMIT)(state)) return false;
      if (!has(PermissionType.CREATE_CONTEST_SUBMISSION)) return false;
      const principal = PrincipalSelectors.principal()(state);
      if (!principal) return false;
      const registration = ContestRegistrationSelectors.byUserAndContest(
        principal.id,
        contestId,
      )(state);

      return !!registration;
    };
  }

  export function hasAdminRole(): Selector<State, boolean> {
    return (state) => has(RoleType.ADMIN)(state);
  }
}

function permissions(): Selector<State, PermissionMap | undefined> {
  return (state) => {
    if (DataHolderState.isLoaded(state.authentication)) {
      return state.authentication.permissions;
    } else {
      return undefined;
    }
  };
}

function has(permission: string): Selector<State, boolean> {
  return (state) => {
    const pers = permissions()(state);
    if (!pers) return false;
    return !!pers[permission];
  };
}
