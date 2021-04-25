import { combineReducers } from 'redux';
import { entityReducer } from './entity-reducers';
import { problemSubmissionsReducer } from './problemSubmissionsReducer';
import { problemUserSubmissionsReducer } from './problemUserSubmissionsReducer';
import { modalReducer } from './modalReducer';
import {
  problemDetailsPageReducer,
  editProblemPageReducer,
  problemsPageReducer,
  articlePageReducer,
  editArticlePageReducer,
  articlesPageReducer,
  userPageReducer,
  adminPageReducer
} from './page-reducers';
import {
  editProblemFormReducer,
  editTagFormReducer,
  editArticleFormReducer,
  editUserFormReducer,
  updateJudgeConfigFormReducer
} from './form-reducers';
import { searchReducer } from './searchReducer';
import { detailedSubmissionModalReducer } from './modal-reducers';
import { tokenReducer } from './tokenReducer';
import { authenticationReducer } from './authenticationReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  authentication: authenticationReducer,
  search: searchReducer,
  entities: entityReducer,
  modal: modalReducer,
  detailedSubmissionModal: detailedSubmissionModalReducer,
  userPage: userPageReducer,
  articlesPage: articlesPageReducer,
  articlePage: articlePageReducer,
  editArticlePage: editArticlePageReducer,
  editArticleForm: editArticleFormReducer,
  problemsPage: problemsPageReducer,
  problemDetailsPage: problemDetailsPageReducer,
  editProblemPage: editProblemPageReducer,
  adminPage: adminPageReducer,
  problemSubmissions: problemSubmissionsReducer,
  problemUserSubmissions: problemUserSubmissionsReducer,
  editProblemForm: editProblemFormReducer,
  editTagForm: editTagFormReducer,
  editUserForm: editUserFormReducer,
  updateJudgeConfigForm: updateJudgeConfigFormReducer
});

export { rootReducer };
