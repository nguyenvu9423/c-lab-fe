import * as React from 'react';
import { Grid, Menu, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { TagPage } from './entity-pages/TagPage';
import { ArticlePage } from './entity-pages/ArticlePage';
import { ProblemPage } from './entity-pages/ProblemPage';
import { UserPage } from './entity-pages/UserPage';
import { RolePage } from './entity-pages/RolePage';

export function AdminPage(props) {
  const baseURL = props.match.url;
  const {
    params: { activePage = 'users' }
  } = useRouteMatch({
    path: `${baseURL}/:activePage?`,
    strict: true
  });
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
      <Grid.Column width={4}>
        <ControlMenu baseURL={baseURL} activePage={activePage} />
      </Grid.Column>
      <Grid.Column width={12}>{content}</Grid.Column>
    </Grid>
  );
}

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
