import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { ProblemSelectors } from '@/store/selectors';
import { ProblemDetailCard } from '../problems/components';
import { BaseContestContentProps } from './shared';
import { ContestInfoCard } from './components';

export namespace ContestProblemContent {
  export interface Props extends BaseContestContentProps {}
}

export const ContestProblemContent: React.FC<ContestProblemContent.Props> = (
  props,
) => {
  const { code } = useParams();
  const { contest, nav } = props;
  const problemConfig = contest.judgeConfig?.problemConfigs.find(
    (config) => config.code === code,
  );

  const problem = useSelector(
    problemConfig
      ? ProblemSelectors.byId(problemConfig.problem)
      : () => undefined,
  );

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          {nav}
          {problem && <ProblemDetailCard problem={problem} />}
        </Grid.Column>
        <Grid.Column width={4}>
          <ContestInfoCard contest={contest} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
