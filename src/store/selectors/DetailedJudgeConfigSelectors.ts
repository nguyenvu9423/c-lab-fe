import { EntityId } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import { State } from '../state';
import { DetailedJudgeConfig } from '@/domains/judge-config';
import { detailedJudgeConfigEntityAdapter } from '../reducers/entity-reducers/detailedJudgeConfigEntityAdapter';

const detailedJudgeConfigEntitySelectors =
  detailedJudgeConfigEntityAdapter.getSelectors(
    (state: State) => state.entity.detailedJudgeConfig,
  );

export namespace DetailedJudgeConfigSelectors {
  export function selectById(
    id: EntityId,
  ): Selector<State, DetailedJudgeConfig> {
    return (state) => {
      const judgeConfig = detailedJudgeConfigEntitySelectors.selectById(
        state,
        id,
      );
      if (!judgeConfig) {
        throw new Error('Could not find judge config');
      }
      return judgeConfig;
    };
  }
}
