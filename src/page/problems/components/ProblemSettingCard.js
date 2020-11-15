import * as React from 'react';
import { Header, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export function ProblemSettingCard(props) {
  const { problem } = props;
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
