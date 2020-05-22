import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { entityReducer } from './entity-reducers';
import { articleReducer } from './articleReducer';
import { articleOverviewReducer } from './articleOverviewReducer';
import { problemSubmissionsReducer } from './problemSubmissionsReducer';
import { problemUserSubmissionsReducer } from './problemUserSubmissionsReducer';
import { modalReducer } from './modalReducer';
import { submissionFilterReducer } from './submissionFilterReducer';
import {
  problemDetailsPageReducer,
  editProblemPageReducer,
  problemsPageReducer
} from './page-reducers';
import { editProblemFormReducer } from './form-reducers';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  search: searchReducer,
  entities: entityReducer,
  article: articleReducer,
  articleOverview: articleOverviewReducer,
  problemsPage: problemsPageReducer,
  problemDetailsPage: problemDetailsPageReducer,
  editProblemPage: editProblemPageReducer,
  problemSubmissions: problemSubmissionsReducer,
  problemUserSubmissions: problemUserSubmissionsReducer,
  submissionFilter: submissionFilterReducer,
  editProblemForm: editProblemFormReducer
});

export { rootReducer };
