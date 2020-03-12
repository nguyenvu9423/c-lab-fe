import * as React from 'react';
import { Segment, Header, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProblemSelectors } from '../../../store/selectors/ProblemSelectors';

export function ProblemSettingCard(props) {
  const { problemId } = props;
  const problem = useSelector(ProblemSelectors.byId(problemId));
  if (!problem) return null;
  return (
    <>
      <Header as="h3" attached="top">
        Cài đặt
      </Header>
      <Menu attached vertical fluid>
        <Menu.Item
          name="update"
          as={Link}
          to={problem ? `${problem.id}/edit` : ''}
        >
          <Icon name="edit" />
          Chỉnh sửa
        </Menu.Item>
        <Menu.Item name="delete">
          <Icon name="trash" />
          Xóa bài
        </Menu.Item>
      </Menu>
    </>
  );
}
