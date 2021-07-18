import { userProblemSubCardReducer } from './card-reducers/userSubProblemCardReducer';
import { State } from './../state';
import { detailedSubModalReducer } from './modal-reducers/detailedSubModalReducer';
import { combineReducers } from 'redux';
import { entityReducer } from './entity-reducers';
import { problemSubmissionsReducer } from './problemSubmissionsReducer';
import { problemUserSubmissionsReducer } from './problemUserSubmissionsReducer';
import { modalReducer } from './modalReducer';
import {
  problemPageReducer,
  editProblemPageReducer,
  problemsPageReducer,
  articlePageReducer,
  editArticlePageReducer,
  articlesPageReducer,
  userPageReducer,
  adminPageReducer,
  problemRejudgePageReducer,
} from './page-reducers';
import {
  editProblemFormReducer,
  editTagFormReducer,
  editArticleFormReducer,
  editUserFormReducer,
  updateJudgeConfigFormReducer,
  editRoleFormReducer,
} from './form-reducers';
import { searchReducer } from './searchReducer';
import { authenticationReducer, principalReducer } from './authentication';

const rootReducer = combineReducers({
  entity: entityReducer,
  authentication: authenticationReducer,
  principal: principalReducer,
  userPage: userPageReducer,

  problemPage: problemPageReducer,
  userSubProblemPage: problemUserSubmissionsReducer,
  submissionProblemPage: problemSubmissionsReducer,
  editProblemPage: editProblemPageReducer,

  problemsPage: problemsPageReducer,
  problemRejudgePage: problemRejudgePageReducer,

  userProblemSubCard: userProblemSubCardReducer,

  articlePage: articlePageReducer,
  articlesPage: articlesPageReducer,
  editArticlePage: editArticlePageReducer,
  editArticleForm: editArticleFormReducer,

  adminPage: adminPageReducer,
  editUserForm: editUserFormReducer,
  editTagForm: editTagFormReducer,
  editRoleForm: editRoleFormReducer,
  editProblemForm: editProblemFormReducer,
  updateJudgeConfigForm: updateJudgeConfigFormReducer,

  detailedSubModal: detailedSubModalReducer,
  search: searchReducer,
  modal: modalReducer,
});

export { rootReducer };
