import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export function ProblemNavMenu({ problem, tabName }) {
  const baseUrl = `/problems/${problem.code}`;

  return (
    <Menu pointing secondary attached="top">
      <Menu.Item as={Link} active={tabName == undefined} to={baseUrl}>
        Content
      </Menu.Item>

      <Menu.Item
        as={Link}
        active={tabName == 'submit'}
        to={`${baseUrl}/submit`}
      >
        Submit
      </Menu.Item>

      <Menu.Item as={Link} active={tabName == 'my'} to={`${baseUrl}/my`}>
        My submissions
      </Menu.Item>

      <Menu.Item
        as={Link}
        active={tabName == 'status'}
        to={`${baseUrl}/status`}
      >
        Status
      </Menu.Item>
    </Menu>
  );
}
