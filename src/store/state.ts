import { EditUserInfoFormState } from './reducers/form-reducers/editUserInfoFormReducer';
import { EntityState } from '@reduxjs/toolkit';

import { Tag } from './../domains/tag/Tag';
import { Role } from './../domains/role/Role';
import { User } from './../domains/user/User';
import { Article } from '../domains/article';

import { PrincipalProblemSubsCardState } from './reducers/card-reducers/principalProblemSubsCardReducer';
import { EditUserFormState } from './reducers/form-reducers/editUserFormReducer';
import { EditArticlePageState } from './reducers/page-reducers/editArticlePageReducer';
import { PrincipalState } from './reducers/authentication/principalReducer';
import { EditArticleFormState } from './reducers/form-reducers/editArticleFormReducer';
import { EditTagFormState } from './reducers/form-reducers/editTagFormReducer';
import { EditRoleFormState } from './reducers/form-reducers/editRoleFormReducer';
import { AdminPageState } from './reducers/page-reducers/adminPageReducer';
import { ArticlePageState } from './reducers/page-reducers/articlePageReducer';

import { ProblemRejudge } from './../domains/problem-rejudge/ProblemRejudge';
import { DetailedJudge, Judge } from './../domains/judge';
import { DetailedSubModalState } from './reducers/modal-reducers/detailedSubModalReducer';
import { Submission, DetailedSub } from '../domains/submission';
import { PrincipalProblemSubsState } from './reducers/principalProblemSubsReducer';
import { ProblemPageState } from './reducers/page-reducers/problemPageReducer';
import { ProblemsPageState } from './reducers/page-reducers/problemsPageReducer';
import { Problem, DetailedProblem } from './../domains/problem/Problem';
import { ProblemSubmissionsState } from './reducers/problemSubmissionsReducer';

import {
  ArticlesPageState,
  EditProblemPageState,
  ProblemRejudgeFormState,
  UserPageState,
} from './reducers/page-reducers';
import {
  EditProblemFormState,
  UpdateJudgeConfigFormState,
} from './reducers/form-reducers';
import { DetailedJudgeConfig, JudgeConfig } from '../domains/judge-config';
import { ToastsState } from './reducers/toastsReducer';
import { SearchState } from './reducers/searchReducer';
import { AuthenticationState } from './reducers/authentication/authenticationReducer';
import { ModalState } from './reducers/modalReducer';
import { EmailVerificationPageState } from './reducers/page-reducers/emailVerificationPageReducer';

export interface State {
  entity: {
    user: EntityState<User>;
    role: EntityState<Role>;
    article: EntityState<Article>;
    problem: EntityState<Problem>;
    detailedProblem: EntityState<DetailedProblem>;
    problemRejudge: EntityState<ProblemRejudge>;
    submission: EntityState<Submission>;
    detailedSub: EntityState<DetailedSub>;
    judge: EntityState<Judge>;
    detailedJudge: EntityState<DetailedJudge>;
    judgeConfig: EntityState<JudgeConfig>;
    detailedJudgeConfig: EntityState<DetailedJudgeConfig>;
    tag: EntityState<Tag>;
  };
  authentication: AuthenticationState;
  principal: PrincipalState;
  userPage: UserPageState;
  editUserInfoForm: EditUserInfoFormState;

  problemPage: ProblemPageState;
  problemPageContents: {
    principalSubmissions: PrincipalProblemSubsState;
    submissions: ProblemSubmissionsState;
  };

  editProblemPage: EditProblemPageState;

  principalProblemSubsCard: PrincipalProblemSubsCardState;

  problemsPage: ProblemsPageState;

  articlePage: ArticlePageState;
  articlesPage: ArticlesPageState;
  editArticlePage: EditArticlePageState;

  emailVerificationPage: EmailVerificationPageState;

  detailedSubModal: DetailedSubModalState;
  adminPage: AdminPageState;

  editUserForm: EditUserFormState;
  editArticleForm: EditArticleFormState;
  editProblemForm: EditProblemFormState;
  editRoleForm: EditRoleFormState;
  editTagForm: EditTagFormState;
  updateJudgeConfigForm: UpdateJudgeConfigFormState;
  problemRejudgeForm: ProblemRejudgeFormState;
  modal: ModalState;

  toasts: ToastsState;
  search: SearchState;
}
