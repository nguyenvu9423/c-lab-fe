import * as React from 'react';
import { Segment, Header, Grid, Menu, Button, Icon } from 'semantic-ui-react';
import { EditProblemForm } from '../../domains/problem';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { UpdateJudgeConfigForm } from '../../domains/judge-config/UpdateJudgeConfigForm';
import { ProblemRejudgeSegment } from './components/ProblemRejudgeSegment';
import { match } from 'react-router';

export const ProblemEditPage: React.FC<{
  match: match<{ url: string; code: string }>;
}> = (props) => {
  const { url: baseURL, params } = props.match;
  const {
    params: { activePage = 'definition' },
  } = useRouteMatch({ path: `${baseURL}/:activePage?`, strict: true });

  let content;
  switch (activePage) {
    case 'definition':
      content = (
        <Segment clearing>
          <Header as="h2">Problem definition</Header>
          <EditProblemForm problemCode={params.code} />
        </Segment>
      );
      break;
    case 'judge-config':
      content = (
        <Segment clearing>
          <Header as="h2">Judge config</Header>
          <UpdateJudgeConfigForm problemCode={params.code} />
        </Segment>
      );
      break;
    case 'rejudge':
      content = (
        <Segment clearing>
          <Header as="h2">Rejudge</Header>
          <ProblemRejudgeSegment problemCode={params.code} />
        </Segment>
      );
      break;
    default:
      content = undefined;
  }

  return (
    <Grid container>
      <Grid.Column width={4}>
        <SectionMenu problemCode={params.code} activePage={activePage} />
      </Grid.Column>
      <Grid.Column width={12}>{content}</Grid.Column>
    </Grid>
  );
};

const SectionMenu: React.FC<{ problemCode: string; activePage: string }> = (
  props
) => {
  const { problemCode, activePage } = props;
  const baseURL = `/problems/${problemCode}/edit`;

  return (
    <Menu vertical fluid pointing>
      <Menu.Item
        as={Link}
        link
        name="definition"
        to={`${baseURL}/definition`}
        active={activePage === 'definition'}
      />
      <Menu.Item
        as={Link}
        link
        name="judge-config"
        to={`${baseURL}/judge-config`}
        active={activePage === 'judge-config'}
      />

      <Menu.Item
        as={Link}
        link
        name="rejudge"
        to={`${baseURL}/rejudge`}
        active={activePage === 'rejudge'}
      />
      <Menu.Item as={Link} name="problem-page" to={`/problems/${problemCode}`}>
        <Icon name="arrow left" />
        Back to problem
      </Menu.Item>
    </Menu>
  );
};
