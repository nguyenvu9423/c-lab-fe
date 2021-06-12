import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header, Menu, Icon } from 'semantic-ui-react';
import { ProblemService } from '../../../service/ProblemService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export function ProblemSettingCard(props) {
  const { problem } = props;

  const history = useHistory();

  const handleRejudge = React.useCallback(() => {
    ProblemService.rejudgeProblem(problem.id).then(() => {
      history.push(`/problems/${problem.id}/edit/rejudge`);
    });
  }, [problem]);

  if (!problem) return null;
  return (
    <>
      <Header as="h3" attached="top">
        Cài đặt
      </Header>
      <Menu attached vertical fluid>
        <Menu.Item name="update" as={Link} to={`${problem.id}/edit`}>
          <Icon name="edit" />
          Chỉnh sửa
        </Menu.Item>
        <Menu.Item name="delete">
          <Icon name="trash" />
          Xóa bài
        </Menu.Item>
        <Menu.Item name="rejudge" onClick={handleRejudge}>
          <Icon name="redo" />
          Chấm lại
        </Menu.Item>
      </Menu>
    </>
  );
}
