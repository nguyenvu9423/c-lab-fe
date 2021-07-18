import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { ProblemService } from '../../../service/ProblemService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
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

  const history = useHistory();

  const handleRejudge = React.useCallback(() => {
    ProblemService.rejudgeProblem(problem.id).then(() => {
      history.push(`/problems/${problem.code}/edit/rejudge`);
    });
  }, [problem]);

  return (
    <div className="clear-fix-container">
      <Header as="h3" floated="left">
        Settings
      </Header>
      <Button
        floated="right"
        content="Edit"
        icon="edit"
        as={Link}
        to={`/problems/${problem.code}/edit`}
      />
      <Button
        floated="right"
        content="Judge Config"
        icon="setting"
        as={Link}
        to={`/problems/${problem.code}/edit/judge-config`}
      />
      <Button
        floated="right"
        content="Rejudge"
        icon="undo"
        onClick={handleRejudge}
      />
    </div>
  );
};
