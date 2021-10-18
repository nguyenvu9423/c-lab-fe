import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Problem } from '../../../domains/problem';
import { AuthenticationSelectors } from '../../../store/selectors';

export const ProblemNavMenu: React.FC<{ problem: Problem; tabName?: string }> =
  (props) => {
    const { problem, tabName } = props;
    const baseUrl = `/problems/${problem.code}`;

    const isAuthenticated = useSelector(
      AuthenticationSelectors.isAuthenticated()
    );

    return (
      <Menu size="large" pointing>
        <Menu.Item as={Link} active={tabName == undefined} to={baseUrl}>
          Đề bài
        </Menu.Item>

        <Menu.Item
          as={Link}
          active={tabName == 'submit'}
          to={`${baseUrl}/submit`}
        >
          Nộp bài
        </Menu.Item>

        {isAuthenticated && (
          <Menu.Item as={Link} active={tabName == 'my'} to={`${baseUrl}/my`}>
            Bài nộp của bạn
          </Menu.Item>
        )}

        <Menu.Item
          as={Link}
          active={tabName == 'status'}
          to={`${baseUrl}/status`}
        >
          Tất cả bài nộp
        </Menu.Item>
      </Menu>
    );
  };
