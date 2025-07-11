import { AnyAction } from 'redux';

export const Target = {
  PROBLEMS_PAGE: 'problemsPage',
  PROBLEM_PAGE: 'problemPage',
  EDIT_PROBLEM_PAGE: 'editProblemPage',
  ProblemPageContents: {
    PRINCIPAL_SUBMISSIONS: 'problemContents.principalSubmissions',
    SUBMISSIONS: 'problemContents.submissions',
  },
  PRINCIPAL_PROBLEM_SUBS_CARD: 'principalProblemSubsCard',
  EDIT_PROBLEM_FORM: 'editProblemForm',
  UPDATE_JUDGE_CONFIG_FORM: 'updateJudgeConfigForm',
  PROBLEM_REJUDGE_FORM: 'problemRejudgeForm',
  PROBLEM_SUBMISSIONS: 'problemSubmissions',

  AUTHENTICATION: 'authentication',
  PRINCIPAL: 'principal',
  USER_PAGE: 'userPage',
  EDIT_USER_INFO_FORM: 'editUserInfoForm',

  EMAIL_VERIFICATION_PAGE: 'emailVerificationPage',

  ARTICLES_PAGE: 'articlesPage',
  ARTICLE_PAGE: 'articlePage',
  EDIT_ARTICLE_PAGE: 'editArticlePage',
  EDIT_ARTICLE_FORM: 'editArticleForm',
  AdminPage: {
    BASE: 'adminPage',
    USER: 'adminPage.user',
    ARTICLE: 'adminPage.article',
    PROBLEM: 'adminPage.problem',
    CONTEST: 'adminPage.contest',
    SUBMISSION: 'adminPage.submission',
    TAG: 'adminPage.tag',
    ROLE: 'adminPage.role',
  },
  EDIT_TAG_FORM: 'editTagForm',
  EDIT_USER_FORM: 'editUserForm',
  EDIT_ROLE_FORM: 'editRoleForm',
  DETAILED_SUB_MODAL: 'detailedSubModal',

  ContestsPage: {
    UPCOMING_CONTESTS: 'contestsPage.upcomingContests',
    FINISHED_CONTESTS: 'contestsPage.finishedContests',
  },
  CONTEST_PAGE: 'contestPage',
  ContestPageContents: {
    SUBMISSIONS: 'contestPageContents.submissions',
    PRINCIPAL_SUBMISSIONS: 'contestPageContents.principalSubmissions',
    SCOREBOARD: 'contestPageContents.scoreboard',
    PARTICIPANTS: 'contestPageContents.participants',
  },
  EDIT_CONTEST_FORM: 'EDIT_CONTEST_FORM',
  EDIT_CONTEST_JUDGE_CONFIG_FORM: 'EDIT_CONTEST_JUDGE_CONFIG_FORM',
  CONTEST_REJUDGE_FORM: 'CONTEST_REJUDGE_FORM',
  CONTEST_PROBLEM_REJUDGE_FORM: 'CONTEST_PROBLEM_REJUDGE_FORM',
};

export namespace TargetPredicates {
  export function equal(target: string) {
    return ({ payload }: AnyAction): boolean => {
      if (payload?.target === undefined || payload?.target === target) {
        return true;
      }
      return false;
    };
  }
}
