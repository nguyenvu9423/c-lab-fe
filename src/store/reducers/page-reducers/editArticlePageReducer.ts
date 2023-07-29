import { Target } from './../target';
import { combineReducers } from 'redux';
import { ArticleState } from './../data-holders/articleReducer';
import { articleReducer } from '../data-holders';
import { createFilteredReducer } from '../utils';
import { TargetPredicates } from '../target';

export interface EditArticlePageState {
  data: {
    article: ArticleState;
  };
}

export const editArticlePageReducer = createFilteredReducer(
  combineReducers<EditArticlePageState>({
    data: combineReducers({
      article: articleReducer,
    }),
  }),
  TargetPredicates.equal(Target.EDIT_ARTICLE_PAGE),
);
