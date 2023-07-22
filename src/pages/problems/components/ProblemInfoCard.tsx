import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserPageLink } from '@/domain-ui/user';
import { Problem } from '@/domains/problem';
import { Segment, Header, Table } from 'semantic-ui-react';
import { JudgeConfigSelectors } from '@/store/selectors';

export namespace ProblemInfoCard {
  export interface Props {
    problem: Problem;
  }
}

export const ProblemInfoCard: React.FC<ProblemInfoCard.Props> = (props) => {
  const { problem } = props;
  const judgeConfig = useSelector(
    problem.judgeConfig
      ? JudgeConfigSelectors.selectById(problem.judgeConfig)
      : () => undefined
  );

  return (
    <>
      <Header as="h3" attached="top" textAlign="center">
        <Link to={`/problems/${problem.code}`}>{problem.code}</Link>
      </Header>
      <Segment attached className="problem-info">
        <Table basic="very" celled fixed>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={5}>Thời gian</Table.Cell>
              <Table.Cell width={10}>
                {judgeConfig ? `${judgeConfig.timeLimit} ms` : 'Chưa thiết lập'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={5}>Bộ nhớ</Table.Cell>
              <Table.Cell width={10}>
                {judgeConfig
                  ? `${judgeConfig.memoryLimit} mb`
                  : 'Chưa thiết lập'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Kiểu bài</Table.Cell>
              <Table.Cell>
                {judgeConfig?.scoringType ?? 'Chưa thiết lập'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Người tạo</Table.Cell>
              <Table.Cell>
                <UserPageLink userId={problem.author} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
};
