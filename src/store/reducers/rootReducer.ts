import { editUserInfoFormReducer } from './form-reducers/editUserInfoFormReducer';
import { combineReducers, Reducer } from 'redux';
import { entityReducer } from './entity-reducers';
import {
  principalProblemSubsReducer,
  PrincipalProblemSubsState,
} from './page-reducers/principalProblemSubsReducer';
import { toastsReducer } from './toastsReducer';
import { principalProblemSubsCardReducer } from './card-reducers/principalProblemSubsCardReducer';
import { State } from './../state';
import { detailedSubModalReducer } from './modal-reducers/detailedSubModalReducer';
import {
  problemSubmissionsReducer,
  ProblemSubmissionsState,
} from './page-reducers/problemSubmissionsReducer';
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
  contestPageReducer,
  PrincipalContestSubsState,
  principalContestSubsReducer,
  ContestScoreboardPageState,
  contestScoreboardPageReducer,
} from './page-reducers';
import {
  editProblemFormReducer,
  editTagFormReducer,
  editArticleFormReducer,
  editUserFormReducer,
  updateJudgeConfigFormReducer,
  editRoleFormReducer,
  editContestFormReducer,
  editContestJudgeConfigFormReducer,
  contestRejudgeFormReducer,
  contestProblemRejudgeFormReducer,
} from './form-reducers';
import { searchReducer } from './searchReducer';
import { authenticationReducer, principalReducer } from './authentication';
import { resetState } from '../actions';
import { emailVerificationPageReducer } from './page-reducers/emailVerificationPageReducer';
import { contestsPageReducer } from './page-reducers/contestsPageReducer';
import {
  contestParticipantsPageReducer,
  ContestParticipantsPageState,
} from './page-reducers/contest/contestParticipantsPageReducer';
import {
  contestSubmissionsPageReducer,
  ContestSubmissionsPageState,
} from './page-reducers/contest/contestSubmissionsPageReducer';

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

  contestsPage: contestsPageReducer,
  contestPage: contestPageReducer,
  contestPageContents: combineReducers<{
    submissions: ContestSubmissionsPageState;
    principalSubmissions: PrincipalContestSubsState;
    scoreboard: ContestScoreboardPageState;
    participants: ContestParticipantsPageState;
  }>({
    submissions: contestSubmissionsPageReducer,
    principalSubmissions: principalContestSubsReducer,
    scoreboard: contestScoreboardPageReducer,
    participants: contestParticipantsPageReducer,
  }),

  editContestForm: editContestFormReducer,
  editContestJudgeConfigForm: editContestJudgeConfigFormReducer,
  contestRejudgeForm: contestRejudgeFormReducer,
  contestProblemRejudgeForm: contestProblemRejudgeFormReducer,

  emailVerificationPage: emailVerificationPageReducer,

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
