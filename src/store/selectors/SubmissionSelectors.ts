import { Submission } from '@/domains/submission';
import { State } from './../state';
import { submissionEntityAdapter } from '../reducers/entity-reducers/submissionEntityAdapter';
import { Selector } from '@reduxjs/toolkit';

const submissionEntitySelectors = submissionEntityAdapter.getSelectors(
  (state: State) => state.entity.submission,
);

export namespace SubmissionSelectors {
  export function byId(id: number): Selector<State, Submission> {
    return (state) => {
      const submission = submissionEntitySelectors.selectById(state, id);
      if (submission === undefined) {
        throw new Error('Could not select submission');
      }
      return submission;
    };
  }

  export function byIds(ids: number[]): Selector<State, Submission[]> {
    return (state) => {
      return ids.map((id) => {
        const submission = submissionEntitySelectors.selectById(state, id);
        if (submission === undefined) {
          throw new Error('Could not find the submission');
        }
        return submission;
      });
    };
  }
}
