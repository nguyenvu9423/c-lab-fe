import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserPageLink } from '../../../domains/user';
import { Problem } from '../../../domains/problem';
import { Segment, Header, Table, Label, Popup } from 'semantic-ui-react';
import {
  getSubLangTitle,
  SubmissionLanguage,
} from '../../../domains/submission-lang/SubmissionLanguage';
import { JudgeConfigSelectors } from '../../../store/selectors';

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
              <Table.Cell width={5}>Giới hạn</Table.Cell>
              <Table.Cell width={10}>
                {judgeConfig
                  ? `${judgeConfig.timeLimit} ms / ${judgeConfig.memoryLimit} mb`
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
            <Table.Row>
              <Table.Cell>Ngôn ngữ</Table.Cell>
              <Table.Cell>
                <SubmissionLangContainer langs={problem.allowedLanguages} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
};

const SubmissionLangContainer: React.FC<{ langs: SubmissionLanguage[] }> = (
  props
) => {
  const { langs } = props;

  const langElements = React.useMemo(
    () =>
      SubmissionLanguage.sort(langs).map((lang) => (
        <Label key={lang}>{getSubLangTitle(lang)}</Label>
      )),
    [langs]
  );

  return (
    <Popup
      trigger={
        <Label.Group className="languages-overview">
          {langElements.length === SubmissionLanguage.values.length
            ? 'Tất cả'
            : langElements}
        </Label.Group>
      }
    >
      <Label.Group>{langElements}</Label.Group>
    </Popup>
  );
};
