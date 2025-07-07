import { Selector } from 'react-redux';
import { ContestSubmission } from '@/domains/contest';
import { contestSubmissionEntityAdapter } from '../reducers/entity-reducers/contestSubmissionEntityAdapter';
import { State } from '../state';

const contestSubmissionEntitySelectors =
  contestSubmissionEntityAdapter.getSelectors(
    (state: State) => state.entity.contestSubmission,
  );

export namespace ContestSubmissionSelectors {
  export function byId(id: number): Selector<State, ContestSubmission> {
    return (state) => {
      const submission = contestSubmissionEntitySelectors.selectById(state, id);
      if (submission === undefined) {
        throw new Error('Could not select submission');
      }
      return submission;
    };
  }

  export function byIds(ids: number[]): Selector<State, ContestSubmission[]> {
    return (state) => {
      return ids.map((id) => {
        const submission = contestSubmissionEntitySelectors.selectById(
          state,
          id,
        );
        if (submission === undefined) {
          throw new Error('Could not find the submission');
        }
        return submission;
      });
    };
  }
}
