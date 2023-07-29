import { Target } from './../target';
import { combineReducers } from 'redux';
import { articlesReducer, ArticlesState } from '../data-holders';
import { TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils';

export interface ArticlesPageState {
  data: {
    articles: ArticlesState;
  };
}

export const articlesPageReducer = createFilteredReducer(
  combineReducers<ArticlesPageState>({
    data: combineReducers({
      articles: articlesReducer,
    }),
  }),
  TargetPredicates.equal(Target.ARTICLES_PAGE),
);
