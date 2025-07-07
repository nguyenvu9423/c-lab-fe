import { EditUserInfoFormState } from './reducers/form-reducers/editUserInfoFormReducer';
import { EntityState } from '@reduxjs/toolkit';

import { Tag } from '@/domains/tag/Tag';
import { Role } from '@/domains/role/Role';
import { User } from '@/domains/user/User';
import { Article } from '@/domains/article';

import { PrincipalProblemSubsCardState } from './reducers/card-reducers/principalProblemSubsCardReducer';
import { EditUserFormState } from './reducers/form-reducers/editUserFormReducer';
import { EditArticlePageState } from './reducers/page-reducers/editArticlePageReducer';
import { PrincipalState } from './reducers/authentication/principalReducer';
import { EditArticleFormState } from './reducers/form-reducers/editArticleFormReducer';
import { EditTagFormState } from './reducers/form-reducers/editTagFormReducer';
import { EditRoleFormState } from './reducers/form-reducers/editRoleFormReducer';
import { AdminPageState } from './reducers/page-reducers/adminPageReducer';
import { ArticlePageState } from './reducers/page-reducers/articlePageReducer';

import { ProblemRejudge } from '@/domains/problem-rejudge/ProblemRejudge';
import { DetailedJudge, Judge } from '@/domains/judge';
import { DetailedSubModalState } from './reducers/modal-reducers/detailedSubModalReducer';
import {
  Submission,
  DetailedSub,
  UserProblemResult,
} from '@/domains/submission';
import { PrincipalProblemSubsState } from './reducers/page-reducers/principalProblemSubsReducer';
import { ProblemPageState } from './reducers/page-reducers/problemPageReducer';
import { ProblemsPageState } from './reducers/page-reducers/problemsPageReducer';
import { Problem, DetailedProblem } from '@/domains/problem/Problem';
import { ProblemSubmissionsState } from './reducers/page-reducers/problemSubmissionsReducer';

import {
  ArticlesPageState,
  ContestPageState,
  ContestScoreboardPageState,
  EditProblemPageState,
  PrincipalContestSubsState,
  ProblemRejudgeFormState,
  UserPageState,
} from './reducers/page-reducers';
import {
  ContestProblemRejudgeFormState,
  ContestRejudgeFormState,
  EditContestFormState,
  EditContestJudgeConfigFormState,
  EditProblemFormState,
  UpdateJudgeConfigFormState,
} from './reducers/form-reducers';
import { DetailedJudgeConfig, JudgeConfig } from '@/domains/judge-config';
import { ToastsState } from './reducers/toastsReducer';
import { SearchState } from './reducers/searchReducer';
import { AuthenticationState } from './reducers/authentication/authenticationReducer';
import { ModalState } from './reducers/modalReducer';
import { EmailVerificationPageState } from './reducers/page-reducers/emailVerificationPageReducer';
import { ContestsPageState } from './reducers/page-reducers/contestsPageReducer';
import {
  Contest,
  ContestProblemRejudge,
  ContestSubmission,
  UserContestRegistration,
} from '@/domains/contest';
import { ContestUserResult } from '@/domains/contest/ContestUserResult';
import { ContestParticipantsPageState } from './reducers/page-reducers/contest/contestParticipantsPageReducer';
import { ContestSubmissionsPageState } from './reducers/page-reducers/contest/contestSubmissionsPageReducer';

export interface State {
  entity: {
    user: EntityState<User>;
    role: EntityState<Role>;
    article: EntityState<Article>;
    problem: EntityState<Problem>;
    contest: EntityState<Contest>;
    contestSubmission: EntityState<ContestSubmission>;
    contestUserResult: EntityState<ContestUserResult>;
    contestProblemRejudge: EntityState<ContestProblemRejudge>;
    detailedProblem: EntityState<DetailedProblem>;
    problemRejudge: EntityState<ProblemRejudge>;
    submission: EntityState<Submission>;
    detailedSub: EntityState<DetailedSub>;
    judge: EntityState<Judge>;
    detailedJudge: EntityState<DetailedJudge>;
    judgeConfig: EntityState<JudgeConfig>;
    detailedJudgeConfig: EntityState<DetailedJudgeConfig>;
    tag: EntityState<Tag>;
    userProblemResult: EntityState<UserProblemResult>;
    userContestRegistration: EntityState<UserContestRegistration>;
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

  contestsPage: ContestsPageState;
  contestPage: ContestPageState;
  contestPageContents: {
    submissions: ContestSubmissionsPageState;
    principalSubmissions: PrincipalContestSubsState;
    scoreboard: ContestScoreboardPageState;
    participants: ContestParticipantsPageState;
  };
  editContestForm: EditContestFormState;
  editContestJudgeConfigForm: EditContestJudgeConfigFormState;
  contestRejudgeForm: ContestRejudgeFormState;
  contestProblemRejudgeForm: ContestProblemRejudgeFormState;

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
