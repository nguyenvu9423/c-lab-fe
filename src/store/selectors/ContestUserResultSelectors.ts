import { Selector } from 'react-redux';
import { State } from '../state';
import { contestUserResultAdapter } from '../reducers/entity-reducers/contestUserResultEntityAdapter';
import { ContestUserResult } from '@/domains/contest/ContestUserResult';

const contestUserResultEntitySelectors = contestUserResultAdapter.getSelectors(
  (state: State) => state.entity.contestUserResult,
);

export namespace ContestUserResultSelectors {
  export function byId(id: number): Selector<State, ContestUserResult> {
    return (state) => {
      const submission = contestUserResultEntitySelectors.selectById(state, id);
      if (submission === undefined) {
        throw new Error('Could not select submission');
      }
      return submission;
    };
  }

  export function byIds(ids: number[]): Selector<State, ContestUserResult[]> {
    return (state) => {
      return ids.map((id) => {
        const submission = contestUserResultEntitySelectors.selectById(
          state,
          id,
        );
        if (submission === undefined) {
          throw new Error('Could not find the result');
        }
        return submission;
      });
    };
  }
}
