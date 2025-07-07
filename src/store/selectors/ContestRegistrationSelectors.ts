import { Selector, EntityId } from '@reduxjs/toolkit';
import { State } from './../state';
import { UserContestRegistration } from '@/domains/contest';
import { userContestRegistrationEntityAdapter } from '../reducers/entity-reducers/userContestRegistrationEntityAdapter';

const userContestRegistrationEntitySelectors =
  userContestRegistrationEntityAdapter.getSelectors(
    (state: State) => state.entity.userContestRegistration,
  );

export namespace ContestRegistrationSelectors {
  export function byId(
    id: EntityId,
  ): Selector<State, UserContestRegistration | undefined> {
    return (state) => {
      const entity = userContestRegistrationEntitySelectors.selectById(
        state,
        id,
      );
      return entity;
    };
  }

  export function byIds(
    ids: EntityId[],
  ): Selector<State, (UserContestRegistration | undefined)[]> {
    return (state) =>
      ids.map((id) => {
        const entity = userContestRegistrationEntitySelectors.selectById(
          state,
          id,
        );
        return entity;
      });
  }

  export function byContest(
    contestId: number,
  ): Selector<State, UserContestRegistration[]> {
    return (state) => {
      const entities = userContestRegistrationEntitySelectors.selectAll(state);
      return entities.filter((entity) => entity.contestId === contestId);
    };
  }

  export function byUserAndContests(
    userId: number,
    contestIds: number[],
  ): Selector<State, UserContestRegistration[]> {
    return (state) => {
      const entities = userContestRegistrationEntitySelectors.selectAll(state);
      return entities.filter(
        (entity) =>
          entity.user.id === userId && contestIds.includes(entity.contestId),
      );
    };
  }

  export function byUserAndContest(
    userId: number,
    contestId: number,
  ): Selector<State, UserContestRegistration | undefined> {
    return (state) => {
      const entities = userContestRegistrationEntitySelectors.selectAll(state);
      return entities.find(
        (entity) => entity.user.id === userId && entity.contestId === contestId,
      );
    };
  }
}
