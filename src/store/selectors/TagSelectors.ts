import { Tag } from './../../domains/tag/Tag';
import { State } from './../state';
import { tagEntityAdapter } from './../reducers/entity-reducers/tagEntityAdapter';
import { Selector } from '@reduxjs/toolkit';

const tagEntitySelectors = tagEntityAdapter.getSelectors(
  (state: State) => state.entity.tag
);

export namespace TagSelectors {
  export function selectById(id: number): Selector<State, Tag> {
    return (state) => {
      const tag = tagEntitySelectors.selectById(state, id);
      if (!tag) {
        throw new Error('Could not find the tag');
      }
      return tag;
    };
  }

  export function selectByIds(ids: number[]): Selector<State, Tag[]> {
    return (state) =>
      ids.map((id) => {
        const tag = tagEntitySelectors.selectById(state, id);
        if (!tag) {
          throw new Error('Could not find the tag');
        }
        return tag;
      });
  }

  export function selectTagsByIds(ids: number[]): Selector<State, Tag[]> {
    return (state) =>
      ids.reduce<Tag[]>((arr, id) => {
        const tag = tagEntitySelectors.selectById(state, id);
        if (tag) arr.push(tag);
        return arr;
      }, []);
  }
}
