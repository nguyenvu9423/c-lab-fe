export const Target = {
  AUTHENTICATION: 'authentication',
  PRINCIPAL: 'principal',
  USER_PAGE: 'userPage',
  PROBLEMS_PAGE: 'PROBLEMS_PAGE',
  PROBLEM_EDIT_PAGE: 'PROBLEM_EDIT_PAGE',
  PROBLEM_SUBMISSIONS: 'problemSubmissions',
  PROBLEM_USER_SUBMISSIONS: 'problemUserSubmissions',
  USER_PROBLEM_SUB_CARD: 'userProblemSubCard',

  ARTICLE_PAGE: 'articlePage',
  ARTICLES_PAGE: 'articlesPage',
  EDIT_ARTICLE_PAGE: 'editArticlePage',
  EDIT_ARTICLE_FORM: 'editArticleForm',
  PROBLEM_DETAILS_PAGE: 'problemDetailsPage',
  ADMIN_PAGE: {
    BASE: 'adminPage',
    TAG: 'adminPage.tag',
    ARTICLE: 'adminPage.article',
    PROBLEM: 'adminPage.problem',
    USER: 'adminPage.user',
    ROLE: 'adminPage.role',
  },
  EDIT_PROBLEM_FORM: 'editProblemForm',
  EDIT_TAG_FORM: 'editTagForm',
  EDIT_USER_FORM: 'editUserForm',
  EDIT_ROLE_FORM: 'editRoleForm',
  DETAILED_SUB_MODAL: 'detailedSubModal',
};

export function createTargetChecker(target) {
  return (action) =>
    action.payload?.target === target || action.meta?.target === target;
}

export function createMetaWithTarget(target) {
  return { target };
}
