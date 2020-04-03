import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { entityReducer } from './entity-reducers';
import { articleReducer } from './articleReducer';
import { articleOverviewReducer } from './articleOverviewReducer';
import { problemOverviewReducer } from './problemOverviewReducer';
import { problemSubmissionsReducer } from './problemSubmissionsReducer';
import { problemUserSubmissionsReducer } from './problemUserSubmissionsReducer';
import { modalReducer } from './modalReducer';
import { submissionFilterReducer } from './submissionFilterReducer';
import {
  problemDetailsPageReducer,
  editProblemPageReducer
} from './page-reducers';

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  entities: entityReducer,
  article: articleReducer,
  articleOverview: articleOverviewReducer,
  problemOverview: problemOverviewReducer,
  problemSubmissions: problemSubmissionsReducer,
  problemUserSubmissions: problemUserSubmissionsReducer,
  submissionFilter: submissionFilterReducer,
  problemDetailsPage: problemDetailsPageReducer,
  editProblemPage: editProblemPageReducer
});

export { rootReducer };
