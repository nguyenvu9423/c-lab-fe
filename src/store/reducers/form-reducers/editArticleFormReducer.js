import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { articleReducer } from '../data-reducers/articleReducer';
import { createTargetChecker, Target } from '../target';

export const editArticleFormReducer = filterActions(
  combineReducers({
    data: combineReducers({
      article: articleReducer
    })
  }),
  createTargetChecker(Target.EDIT_ARTICLE_FORM)
);
