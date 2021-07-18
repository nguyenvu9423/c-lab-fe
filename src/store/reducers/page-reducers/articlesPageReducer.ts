import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';

import { Target, createTargetChecker } from '../target';
import { articlesReducer, ArticlesState } from '../data-holders';

export interface ArticlesPageState {
  data: {
    articles: ArticlesState;
  };
}

export const articlesPageReducer = filterActions(
  combineReducers<ArticlesPageState>({
    data: combineReducers({
      articles: articlesReducer,
    }),
  }),
  createTargetChecker(Target.ARTICLES_PAGE)
);
