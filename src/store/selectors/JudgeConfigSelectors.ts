import { EntityId, Selector } from '@reduxjs/toolkit';
import { State } from './../state';
import { judgeConfigEntityAdapter } from '../reducers/entity-reducers/judgeConfigEntityAdapter';
import { JudgeConfig } from '@/domains/judge-config';

const judgeConfigEntitySelectors = judgeConfigEntityAdapter.getSelectors(
  (state: State) => state.entity.judgeConfig
);

export namespace JudgeConfigSelectors {
  export function selectById(id: EntityId): Selector<State, JudgeConfig> {
    return (state) => {
      const judgeConfig = judgeConfigEntitySelectors.selectById(state, id);
      if (!judgeConfig) {
        throw new Error('Could not find judge config');
      }
      return judgeConfig;
    };
  }
}
