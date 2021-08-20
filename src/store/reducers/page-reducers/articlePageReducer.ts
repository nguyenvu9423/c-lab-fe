import { Target } from './../target';
import { ArticleState } from './../data-holders/articleReducer';
import { combineReducers } from 'redux';
import { articleReducer } from '../data-holders';
import { TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils';

export interface ArticlePageState {
  data: {
    article: ArticleState;
  };
}

export const articlePageReducer = createFilteredReducer(
  combineReducers<ArticlePageState>({
    data: combineReducers({
      article: articleReducer,
    }),
  }),
  TargetPredicates.equal(Target.ARTICLE_PAGE)
);
