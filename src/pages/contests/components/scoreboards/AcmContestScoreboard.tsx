import React from 'react';
import { Table } from 'semantic-ui-react';
import { AcmContestUserProblemResult } from '@/domains/contest/ContestUserProblemResult';
import { UserPageLink } from '@/domain-ui/user';
import { ContestProblemConfig } from '@/domains/contest/ContestProblemConfig';
import { AcmContestUserResult } from '@/domains/contest/ContestUserResult';
import { ContestProblemPageLink } from '../ContestProblemPageLink';
import { EmptyTableBody } from '../../../../components/table/EmptyTableBody';

export namespace AcmContestScoreboard {
  export interface Props {
    contestId: number;
    problemConfigs: ContestProblemConfig[];
    userResults: AcmContestUserResult[];
  }
}

export const AcmContestScoreboard: React.FC<AcmContestScoreboard.Props> = (
  props,
) => {
  const { contestId, problemConfigs, userResults } = props;

  return (
    <Table celled fixed compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1} textAlign="center">
            #
          </Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign="center">
            Thí sinh
          </Table.HeaderCell>
          <Table.HeaderCell width={1} textAlign="center">
            Kết quả
          </Table.HeaderCell>
          <Table.HeaderCell width={1} textAlign="center">
            Penalty
          </Table.HeaderCell>
          {problemConfigs.length > 0 ? (
            problemConfigs.map((problemConfig) => (
              <Table.HeaderCell
                width={1}
                textAlign="center"
                key={problemConfig.code}
              >
                <ContestProblemPageLink
                  contestId={contestId}
                  code={problemConfig.code}
                />
              </Table.HeaderCell>
            ))
          ) : (
            <Table.HeaderCell width={10} />
          )}
        </Table.Row>
      </Table.Header>
      {userResults.length > 0 ? (
        <Table.Body>
          {userResults.map((userResult, index) => {
            const { user, problemResults } = userResult;
            return (
              <Table.Row key={user.id}>
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">
                  <UserPageLink userId={user.id} username={user.username} />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <strong>{userResult.score}</strong>
                </Table.Cell>
                <Table.Cell textAlign="center">{userResult.penalty}</Table.Cell>
                {problemConfigs.map((problemConfig) => {
                  const problemResult: AcmContestUserProblemResult =
                    problemResults.find(
                      (result) => result.problem.id === problemConfig.problem,
                    ) as unknown as AcmContestUserProblemResult;

                  if (!problemResult) {
                    return (
                      <Table.Cell
                        width={2}
                        key={problemConfig.code}
                        textAlign="center"
                      >
                        -
                      </Table.Cell>
                    );
                  }
                  const { score, penalty, tryCount } = problemResult;

                  return (
                    <Table.Cell
                      width={2}
                      textAlign="center"
                      key={problemConfig.code}
                      positive={score === 1}
                    >
                      {penalty}
                      <br />
                      {tryCount} tries
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      ) : (
        <EmptyTableBody content="Chưa có bài nộp" />
      )}
    </Table>
  );
};
