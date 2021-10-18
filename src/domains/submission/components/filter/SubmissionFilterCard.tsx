import * as React from 'react';
import { useSelector } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import {
  ConstSelectors,
  JudgeConfigSelectors,
} from '../../../../store/selectors';
import { ScoringType } from '../../../judge-config';

import { Problem } from '../../../problem';
import { AcmFilterForm } from './AcmFilterForm';
import { OIFilterForm } from './OIFilterForm';

export namespace SubmissionFilterCard {
  export interface Props {
    problem: Problem;

    onQueryChange?(query: string | undefined): void;
  }
}

export const SubmissionFilterCard: React.FC<SubmissionFilterCard.Props> = (
  props
) => {
  const { problem, onQueryChange } = props;
  const judgeConfig = useSelector(
    problem.judgeConfig
      ? JudgeConfigSelectors.selectById(problem.judgeConfig)
      : ConstSelectors.value(undefined)
  );

  if (!judgeConfig) return null;

  return (
    <>
      <Header as="h3" attached="top">
        Lọc
      </Header>
      <Segment attached="bottom" clearing>
        {judgeConfig.scoringType === ScoringType.ACM ? (
          <AcmFilterForm onQueryChange={onQueryChange} />
        ) : (
          <OIFilterForm onQueryChange={onQueryChange} />
        )}
      </Segment>
    </>
  );
};
