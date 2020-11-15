import { filterActions } from 'redux-ignore';
import { createTargetChecker, Target } from '../target';
import { combineReducers } from 'redux';
import { articleReducer } from '../data-reducers';

const isWithTarget = createTargetChecker(Target.ARTICLE_PAGE);

export const articlePageReducer = filterActions(
  combineReducers({
    data: combineReducers({
      article: articleReducer
    })
  }),
  isWithTarget
);
