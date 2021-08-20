import { editUserInfoFormReducer } from './form-reducers/editUserInfoFormReducer';
import { combineReducers, AnyAction, Reducer } from 'redux';
import { entityReducer } from './entity-reducers';
import {
  principalProblemSubsReducer,
  PrincipalProblemSubsState,
} from './principalProblemSubsReducer';
import { toastsReducer } from './toastsReducer';
import { principalProblemSubsCardReducer } from './card-reducers/principalProblemSubsCardReducer';
import { State } from './../state';
import { detailedSubModalReducer } from './modal-reducers/detailedSubModalReducer';
import {
  problemSubmissionsReducer,
  ProblemSubmissionsState,
} from './problemSubmissionsReducer';
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
  problemRejudgeFormReducer,
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
import { resetState } from '../actions';

const rootReducer: Reducer<State> = (state, action) => {
  if (resetState.match(action) && action.payload.target === undefined) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const appReducer = combineReducers<State>({
  entity: entityReducer,
  authentication: authenticationReducer,
  principal: principalReducer,
  userPage: userPageReducer,
  editUserInfoForm: editUserInfoFormReducer,

  problemPage: problemPageReducer,
  problemPageContents: combineReducers<{
    principalSubmissions: PrincipalProblemSubsState;
    submissions: ProblemSubmissionsState;
  }>({
    principalSubmissions: principalProblemSubsReducer,
    submissions: problemSubmissionsReducer,
  }),

  principalProblemSubsCard: principalProblemSubsCardReducer,

  editProblemPage: editProblemPageReducer,

  problemsPage: problemsPageReducer,
  problemRejudgeForm: problemRejudgeFormReducer,

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
  toasts: toastsReducer,
});

export { rootReducer };
