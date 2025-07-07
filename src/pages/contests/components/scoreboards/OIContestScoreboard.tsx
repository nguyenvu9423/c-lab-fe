import React from 'react';
import { Table } from 'semantic-ui-react';
import { ContestProblemConfig, OIContestUserResult } from '@/domains/contest';
import { UserPageLink } from '@/domain-ui/user';
import { ContestProblemPageLink } from '../ContestProblemPageLink';

export namespace OIContestScoreboard {
  export interface Props {
    contestId: number;
    problemConfigs: ContestProblemConfig[];
    userResults: OIContestUserResult[];
  }
}

export const OIContestScoreboard: React.FC<OIContestScoreboard.Props> = (
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
            Tài nguyên
          </Table.HeaderCell>
          {problemConfigs.map((problemConfig) => (
            <Table.HeaderCell
              key={problemConfig.code}
              width={1}
              textAlign="center"
            >
              <ContestProblemPageLink
                contestId={contestId}
                code={problemConfig.code}
              />
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {userResults.map((userResult, index) => {
          const { user, problemResults, totalResource } = userResult;
          console.log('🚀 ~ {userResults.map ~ userResult:', userResult);

          return (
            <Table.Row key={user.id}>
              <Table.Cell textAlign="center">{index}</Table.Cell>
              <Table.Cell textAlign="center">
                <UserPageLink userId={user.id} username={user.username} />
              </Table.Cell>
              <Table.Cell textAlign="center">
                <strong>{userResult.score}</strong>
              </Table.Cell>
              <Table.Cell textAlign="center">
                {totalResource.time}ms / {totalResource.memory}mb
              </Table.Cell>
              {problemConfigs.map((problemConfig) => {
                const problemResult = problemResults.find(
                  (result) => result.problem.id === problemConfig.problem,
                );

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
                const { score, resource } = problemResult;

                return (
                  <Table.Cell
                    width={2}
                    textAlign="center"
                    key={problemConfig.code}
                    positive={score === 1}
                    warning={score < 1 && score > 0}
                  >
                    {score}
                    <br />
                    {resource.time}ms / {resource.memory}mb
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
