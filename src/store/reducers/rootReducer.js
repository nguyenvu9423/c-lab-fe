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
  adminPageReducer,
  problemRejudgePageReducer
} from './page-reducers';
import {
  editProblemFormReducer,
  editTagFormReducer,
  editArticleFormReducer,
  editUserFormReducer,
  updateJudgeConfigFormReducer,
  editRoleFormReducer
} from './form-reducers';
import { searchReducer } from './searchReducer';
import { detailedSubmissionModalReducer } from './modal-reducers';
import { authenticationReducer } from './authentication';
import { principalReducer } from './authentication/principalReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  principal: principalReducer,
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
  problemRejudgePage: problemRejudgePageReducer,
  adminPage: adminPageReducer,
  problemSubmissions: problemSubmissionsReducer,
  problemUserSubmissions: problemUserSubmissionsReducer,
  editProblemForm: editProblemFormReducer,
  editTagForm: editTagFormReducer,
  editUserForm: editUserFormReducer,
  editRoleForm: editRoleFormReducer,
  updateJudgeConfigForm: updateJudgeConfigFormReducer
});

export { rootReducer };
