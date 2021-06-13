import { filterActions } from 'redux-ignore';
import { combineReducers } from 'redux';
import {
  codeReducer,
  judgeDetailedResultReducer,
  submissionReducer,
} from '../data-reducers';
import { createTargetChecker, Target } from '../target';

const targetChecker = createTargetChecker(Target.DETAILED_SUBMISSION_MODAL);

export const detailedSubmissionModalReducer = filterActions(
  combineReducers({
    data: combineReducers({
      submission: submissionReducer,
      code: codeReducer,
      detailedResult: judgeDetailedResultReducer,
    }),
  }),
  targetChecker
);
