import * as React from 'react';
import { Segment, Header, Grid, Menu } from 'semantic-ui-react';
import { EditProblemForm } from '../../domains/problem';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { UpdateJudgeConfigForm } from '../../domains/judge-config/UpdateJudgeConfigForm';
import { ProblemRejudgeSegment } from './components/ProblemRejudgeSegment';

export function ProblemEditPage(props) {
  const baseURL = props.match.url;
  const {
    params: { activePage = 'definition' }
  } = useRouteMatch({ path: `${baseURL}/:activePage?`, strict: true });
  const {
    history,
    match: { params }
  } = props;

  // const handleSuccess = React.useCallback(data => {
  //   history.push(`/problems/${data.code}`);
  // }, []);

  const handleCancel = React.useCallback(() => {
    history.goBack();
  }, []);

  let content;
  switch (activePage) {
    case 'definition':
      content = (
        <Segment clearing>
          <Header as="h2">Problem definition</Header>
          <EditProblemForm problemId={params.id} onCancel={handleCancel} />
        </Segment>
      );
      break;
    case 'judge-config':
      content = (
        <Segment clearing>
          <Header as="h2">Judge config</Header>
          <UpdateJudgeConfigForm problemId={params.id} />
        </Segment>
      );
      break;
    case 'rejudge':
      content = (
        <Segment clearing>
          <Header as="h2">Rejudge</Header>
          <ProblemRejudgeSegment problemId={params.id} />
        </Segment>
      );
      break;
    default:
      content = undefined;
  }

  return (
    <Grid container>
      <Grid.Column width={4}>
        <SectionMenu baseURL={baseURL} activePage={activePage} />
      </Grid.Column>
      <Grid.Column width={12}>{content}</Grid.Column>
    </Grid>
  );
}

function SectionMenu(props) {
  const { baseURL, activePage } = props;
  return (
    <Menu vertical fluid size="large">
      <Menu.Item>
        <Menu.Header>Settings</Menu.Header>
        <Menu.Menu>
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
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Jobs</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            as={Link}
            link
            name="rejudge"
            to={`${baseURL}/rejudge`}
            active={activePage === 'rejudge'}
          />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
}
