import { Selector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { UserProblemResult } from '@/domains/submission';
import { userProblemResultAdapter } from '../reducers/entity-reducers/userProblemEntityAdapter';
import { State } from '../state';

const userProblemResultEntitySelectors = userProblemResultAdapter.getSelectors(
  (state: State) => state.entity.userProblemResult,
);

export namespace UserProblemResultSelectors {
  export function byId(id: EntityId): Selector<State, UserProblemResult> {
    return (state) => {
      const result = userProblemResultEntitySelectors.selectById(state, id);
      if (!result) {
        throw new Error('Could not find result');
      }
      return result;
    };
  }

  export function byIds(ids: EntityId[]): Selector<State, UserProblemResult[]> {
    return (state) =>
      ids.map((id) => {
        console.log(state, id);
        const result = userProblemResultEntitySelectors.selectById(state, id);
        if (!result) throw new Error('Could not find the results');
        return result;
      });
  }
}
