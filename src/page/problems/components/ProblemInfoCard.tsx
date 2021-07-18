import * as React from 'react';
import { Problem } from '../../../domains/problem';
import { Segment, Header, Table, Label } from 'semantic-ui-react';
import { getSubLangTitle } from '../../../domains/submission-lang/SubmissionLanguage';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { JudgeConfigSelectors } from '../../../store/selectors';
import { UserPageLink } from '../../../domains/user';

export namespace ProblemInfoCard {
  export interface Props {
    problem: Problem;
  }
}

export const ProblemInfoCard: React.FC<ProblemInfoCard.Props> = (props) => {
  const { problem } = props;
  React.useState;
  const judgeConfig = useSelector(
    problem.judgeConfig
      ? JudgeConfigSelectors.selectById(problem.judgeConfig)
      : () => undefined
  );

  return (
    <>
      <Header as="h3" attached="top">
        Thông tin
      </Header>
      <Segment attached>
        <Table basic="very" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width="4">Code</Table.Cell>
              <Table.Cell width="12">
                <Link to={`/problems/${problem.code}`}>{problem.code}</Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Author</Table.Cell>
              <Table.Cell>
                <UserPageLink userId={problem.author} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Limit</Table.Cell>
              <Table.Cell>
                {judgeConfig
                  ? `${judgeConfig.timeLimit} ms / ${judgeConfig.memoryLimit} mb`
                  : 'Not specified yet'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Languages</Table.Cell>
              <Table.Cell>
                {problem.allowedLanguages.map((lang) => (
                  <Label key={lang}>{getSubLangTitle(lang)}</Label>
                ))}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
};
