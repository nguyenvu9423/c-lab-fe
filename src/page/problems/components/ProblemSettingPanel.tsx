import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { Problem } from '../../../domains/problem';

export namespace ProblemSettingPanel {
  export interface Props {
    problem: Problem;
  }
}

export const ProblemSettingPanel: React.FC<ProblemSettingPanel.Props> = (
  props
) => {
  const { problem } = props;

  return (
    <div className="clear-fix-container">
      <Header as="h3" floated="left">
        Cài đặt
      </Header>
      <Button
        floated="right"
        content="Sửa"
        icon="edit"
        as={Link}
        to={`/problems/${problem.code}/edit`}
      />
      <Button
        floated="right"
        content="Cài đặt chấm bài"
        icon="setting"
        as={Link}
        to={`/problems/${problem.code}/edit/judge-config`}
      />
      <Button
        floated="right"
        content="Chấm lại"
        icon="undo"
        as={Link}
        to={`/problems/${problem.code}/edit/rejudge`}
      />
    </div>
  );
};
