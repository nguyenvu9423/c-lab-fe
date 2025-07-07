import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Table } from 'semantic-ui-react';
import { ContestProblemConfig } from '@/domains/contest';
import { ProblemSelectors } from '@/store/selectors';

import { ContestInfoCard } from './components';
import { BaseContestContentProps } from './shared';
import { EmptyTableBody } from '../../components/table/EmptyTableBody';

export namespace ContestProblemsContent {
  export interface Props extends BaseContestContentProps {}
}

export const ContestProblemsContent: React.FC<ContestProblemsContent.Props> = (
  props,
) => {
  const { contest, nav } = props;
  const { judgeConfig } = contest;
  const { problemConfigs } = judgeConfig ?? {};

  return (
    <Grid>
      <Grid.Column width={12}>
        {nav}
        <Header as="h4" attached="top">
          Bài tập
        </Header>
        <Segment attached>
          <Table basic fixed singleLine style={{ border: 'none' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>Mã</Table.HeaderCell>
                <Table.HeaderCell width={14}>Tên</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {problemConfigs && problemConfigs.length > 0 ? (
              <Table.Body>
                {problemConfigs.map((config) => (
                  <ProblemConfigRow key={config.code} problemConfig={config} />
                ))}
              </Table.Body>
            ) : (
              <EmptyTableBody content="Chưa có bài tập" />
            )}
          </Table>
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <ContestInfoCard contest={contest} />
      </Grid.Column>
    </Grid>
  );
};

const ProblemConfigRow: React.FC<{ problemConfig: ContestProblemConfig }> = (
  props,
) => {
  const { problemConfig } = props;
  const problem = useSelector(ProblemSelectors.byId(problemConfig.problem));

  return (
    <Table.Row>
      <Table.Cell>
        <Link to={problemConfig.code}>{problemConfig.code}</Link>
      </Table.Cell>
      <Table.Cell>
        <Link to={problemConfig.code}>{problem.title}</Link>
      </Table.Cell>
    </Table.Row>
  );
};
