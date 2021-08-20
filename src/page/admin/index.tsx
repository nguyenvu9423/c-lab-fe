import * as React from 'react';
import { Grid, Menu, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { match, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';

import { TagPage } from './entity-pages/tag';
import { ArticlePage } from './entity-pages/article';
import { ProblemPage } from './entity-pages/problem';
import { UserPage } from './entity-pages/user';
import { RolePage } from './entity-pages/RolePage';
import { AuthorizationSelectors } from '../../store/selectors';

export const AdminPage: React.FC<{ match: match }> = (props) => {
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
    default:
      content = undefined;
  }
  return (
    <Grid container doubling stackable>
      <Grid.Row>
        {hasAdminRole ? (
          <>
            <Grid.Column width={4}>
              <ControlMenu baseURL={baseURL} activePage={activePage} />
            </Grid.Column>
            <Grid.Column width={12}>{content}</Grid.Column>{' '}
          </>
        ) : (
          <Grid.Column stretched>
            <Message error fluid>
              <p>You do not have admin permission to access this page</p>
            </Message>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

function ControlMenu(props) {
  const { baseURL, activePage } = props;
  return (
    <Menu vertical fluid size="large">
      <Menu.Item>
        <Menu.Header>Data</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            as={Link}
            link
            name="users"
            to={`${baseURL}/users`}
            active={activePage === 'users'}
          />
          <Menu.Item
            as={Link}
            link
            name="problems"
            to={`${baseURL}/problems`}
            active={activePage === 'problems'}
          />
          <Menu.Item
            as={Link}
            link
            name="tags"
            to={`${baseURL}/tags`}
            active={activePage === 'tags'}
          />
          <Menu.Item
            as={Link}
            link
            name="articles"
            to={`${baseURL}/articles`}
            active={activePage === 'articles'}
          />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Authorization</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            as={Link}
            name="roles"
            to={`${baseURL}/roles`}
            active={activePage === 'roles'}
          />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
}
