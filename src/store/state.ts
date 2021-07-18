import { UserProblemSubCardState } from './reducers/card-reducers/userSubProblemCardReducer';
import { EditArticleFormState } from './reducers/form-reducers/editArticleFormReducer';
import { EditTagFormState } from './reducers/form-reducers/editTagFormReducer';
import { EditRoleFormState } from './reducers/form-reducers/editRoleFormReducer';
import { AdminPageState } from './reducers/page-reducers/adminPageReducer';
import { ArticlePageState } from './reducers/page-reducers/articlePageReducer';
import { Tag } from './../domains/tag/Tag';
import { Role } from './../domains/role/Role';
import { User } from './../domains/user/User';
import { EntityState } from '@reduxjs/toolkit';
import { ProblemRejudge } from './../domains/problem-rejudge/ProblemRejudge';
import { DetailedJudge, Judge } from './../domains/judge';
import { DetailedSubModalState } from './reducers/modal-reducers/detailedSubModalReducer';
import { Submission, DetailedSub } from './../domains/submission/submission';
import { ProblemUserSubmissionsState } from './reducers/problemUserSubmissionsReducer';
import { ProblemPageState } from './reducers/page-reducers/problemPageReducer';
import { ProblemsPageState } from './reducers/page-reducers/problemsPageReducer';
import { Problem, DetailedProblem } from './../domains/problem/Problem';
import { ProblemSubmissionsState } from './reducers/problemSubmissionsReducer';
import { Article } from '../domains/article';
import {
  ArticlesPageState,
  ProblemRejudgePageState,
} from './reducers/page-reducers';
import {
  EditProblemFormState,
  UpdateJudgeConfigFormState,
} from './reducers/form-reducers';
import { JudgeConfig } from '../domains/judge-config';

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
    judgeConfig: EntityState<JudgeConfig>;
    detailedJudge: EntityState<DetailedJudge>;
    tag: EntityState<Tag>;
  };
  problemPage: ProblemPageState;
  userSubProblemPage: ProblemUserSubmissionsState;
  submissionProblemPage: ProblemSubmissionsState;

  userProblemSubCard: UserProblemSubCardState;

  problemsPage: ProblemsPageState;

  articlePage: ArticlePageState;
  articlesPage: ArticlesPageState;
  detailedSubModal: DetailedSubModalState;
  adminPage: AdminPageState;
  editArticleForm: EditArticleFormState;
  editProblemForm: EditProblemFormState;
  editRoleForm: EditRoleFormState;
  editTagForm: EditTagFormState;
  updateJudgeConfigForm: UpdateJudgeConfigFormState;
  problemRejudgePage: ProblemRejudgePageState;

  [key: string]: any;
}
