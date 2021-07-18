import { Selector, EntityId } from '@reduxjs/toolkit';
import { State } from './../state';
import { articleEntityAdapter } from '../reducers/entity-reducers/articleEntityAdapter';
import { Article } from '../../domains/article';

const articleEntitySelectors = articleEntityAdapter.getSelectors(
  (state: State) => state.entity.article
);

export namespace ArticleSelectors {
  export function byId(id: EntityId): Selector<State, Article | undefined> {
    return (state) => articleEntitySelectors.selectById(state, id);
  }

  export function byIds(
    ids: EntityId[]
  ): Selector<State, (Article | undefined)[]> {
    return (state) =>
      ids.map((id) => articleEntitySelectors.selectById(state, id));
  }
}
