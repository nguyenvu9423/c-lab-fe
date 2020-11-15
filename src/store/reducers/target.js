export const Target = {
  USER_PAGE: 'userPage',
  ARTICLE_PAGE: 'articlePage',
  ARTICLES_PAGE: 'articlesPage',
  EDIT_ARTICLE_PAGE: 'editArticlePage',
  EDIT_ARTICLE_FORM: 'editArticleForm',
  PROBLEM_DETAILS_PAGE: 'problemDetailsPage',
  PROBLEM_EDIT_PAGE: 'PROBLEM_EDIT_PAGE',
  PROBLEMS_PAGE: 'PROBLEMS_PAGE',
  PROBLEM_SUBMISSIONS: 'problemSubmissions',
  PROBLEM_USER_SUBMISSIONS: 'problemUserSubmissions',
  ADMIN_PAGE: {
    BASE: 'adminPage',
    TAG: 'adminPage.tag',
    ARTICLE: 'adminPage.article',
    PROBLEM: 'adminPage.problem',
    USER: 'adminPage.user'
  },
  EDIT_PROBLEM_FORM: 'editProblemForm',
  EDIT_TAG_FORM: 'editTagForm',
  EDIT_USER_FORM: 'editUserForm'
};

export function createTargetChecker(target) {
  return action => action.meta?.target === target;
}

export function createMetaWithTarget(target) {
  return { target };
}
