import * as React from 'react';
import { Grid, Menu, Ref, Sticky } from 'semantic-ui-react';
import { useMatch } from 'react-router';
import { Link } from 'react-router-dom';
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
import { TOP_NAV_OFFSET } from '../../common/variables';

export const AdminPage: React.FC = () => {
  useScrollToTop();

  const match = useMatch({ path: 'admin/:activePage' });
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

  const contextRef = React.useRef<HTMLElement>(null);

  if (!hasAdminRole) {
    return <PageErrorMessage message="Bạn không có quyền truy cập trang này" />;
  }

  return (
    <Grid container doubling stackable>
      <Ref innerRef={contextRef}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sticky context={contextRef} offset={TOP_NAV_OFFSET}>
              <ControlMenu baseURL="/admin" activePage={activePage} />
            </Sticky>
          </Grid.Column>
          <Grid.Column width={12}>{content}</Grid.Column>{' '}
        </Grid.Row>
      </Ref>
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
