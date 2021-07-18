import { createTargetChecker, Target } from '../target';
import { filterActions } from 'redux-ignore';
import { combineReducers } from 'redux';
import { articleReducer } from '../data-holders';

const isWithTarget = createTargetChecker(Target.EDIT_ARTICLE_PAGE);

export const editArticlePageReducer = filterActions(
  combineReducers({
    data: combineReducers({
      article: articleReducer,
    }),
  }),
  isWithTarget
);
