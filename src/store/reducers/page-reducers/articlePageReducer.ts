import { ArticleState } from './../data-holders/articleReducer';
import { filterActions } from 'redux-ignore';
import { createTargetChecker, Target } from '../target';
import { combineReducers } from 'redux';
import { articleReducer } from '../data-holders';

export interface ArticlePageState {
  data: {
    article: ArticleState;
  };
}

export const articlePageReducer = filterActions(
  combineReducers<ArticlePageState>({
    data: combineReducers({
      article: articleReducer,
    }),
  }),
  createTargetChecker(Target.ARTICLE_PAGE)
);
