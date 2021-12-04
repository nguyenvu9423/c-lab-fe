import * as React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { match, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';

import { TagPage } from './entity-pages/tag';
import { ArticlePage } from './entity-pages/article';
import { UserPage } from './entity-pages/user';
import { RolePage } from './entity-pages/RolePage';
import { AuthorizationSelectors } from '../../store/selectors';
import { PageErrorMessage } from '../shared';
import { SubmissionPage } from './entity-pages/submission';
import { ProblemPage } from './entity-pages/problem';
import { useScrollToTop } from '../../common/hooks';

export const AdminPage: React.FC<{ match: match }> = (props) => {
  useScrollToTop();

  const baseURL = props.match.url;
  const match = useRouteMatch<{ activePage: string | undefined }>({
    path: `${baseURL}/:activePage?`,
    strict: true,
  });

  const activePage = match?.params.activePage ?? 'users';

  const hasAdminRole = useSelector(AuthorizationSelectors.hasAdminRole());

  let content;
  switch (activePage) {
    case 'tags':
      content = <TagPage />;
      break;
    case 'articles':
      content = <ArticlePage />;
      break;
    case 'problems':
      content = <ProblemPage />;
      break;
    case 'users':
      content = <UserPage />;
      break;
    case 'roles':
      content = <RolePage />;
      break;
    case 'submissions':
      content = <SubmissionPage />;
      break;
    default:
      content = undefined;
  }
  if (!hasAdminRole) {
    return (
      <PageErrorMessage message="You do not have admin permission to access this page" />
    );
  }
  return (
    <Grid container doubling stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <ControlMenu baseURL={baseURL} activePage={activePage} />
        </Grid.Column>
        <Grid.Column width={12}>{content}</Grid.Column>{' '}
      </Grid.Row>
    </Grid>
  );
};

function ControlMenu(props) {
  const { baseURL, activePage } = props;
  return (
    <Menu vertical fluid size="large">
      <Menu.Item>
        <Menu.Header>Dữ liệu</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            as={Link}
            link
            content="Người dùng"
            to={`${baseURL}/users`}
            active={activePage === 'users'}
          />
          <Menu.Item
            as={Link}
            link
            content="Bài tập"
            to={`${baseURL}/problems`}
            active={activePage === 'problems'}
          />
          <Menu.Item
            as={Link}
            link
            content="Nhãn"
            to={`${baseURL}/tags`}
            active={activePage === 'tags'}
          />
          <Menu.Item
            as={Link}
            link
            content="Bài viết"
            to={`${baseURL}/articles`}
            active={activePage === 'articles'}
          />
          <Menu.Item
            as={Link}
            link
            content="Bài nộp"
            to={`${baseURL}/submissions`}
            active={activePage === 'submissions'}
          />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Quyền hạn</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            as={Link}
            content="Vai trò"
            to={`${baseURL}/roles`}
            active={activePage === 'roles'}
          />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
}
