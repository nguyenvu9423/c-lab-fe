import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { entityReducer } from './entityReducer';
import { articleReducer } from './articleReducer';
import { articleOverviewReducer } from './articleOverviewReducer';
import { problemOverviewReducer } from './problemOverviewReducer';
import { problemSubmissionsReducer } from './problemSubmissionsReducer';
import { userSubmissionsToProblemReducer } from './userSubmissionsToProblemReducer';
import { modalReducer } from './modalReducer';
import { submissionFilterReducer } from './submissionFilterReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  entities: entityReducer,
  article: articleReducer,
  articleOverview: articleOverviewReducer,
  problemOverview: problemOverviewReducer,
  problemSubmissions: problemSubmissionsReducer,
  userSubmissionsToProblem: userSubmissionsToProblemReducer,
  submissionFilter: submissionFilterReducer
});

export { rootReducer };
