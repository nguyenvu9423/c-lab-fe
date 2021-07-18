import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Problem } from '../../../domains/problem';

export const ProblemNavMenu: React.FC<{ problem: Problem; tabName?: string }> =
  (props) => {
    const { problem, tabName } = props;

    const baseUrl = `/problems/${problem.code}`;

    return (
      <Menu pointing>
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
  };
