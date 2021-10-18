import * as React from 'react';
import { Segment, Header, Grid, Menu, Icon } from 'semantic-ui-react';
import { EditProblemForm, ProblemRejudgeForm } from '../../domains/problem';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { UpdateJudgeConfigForm } from '../../domains/judge-config/UpdateJudgeConfigForm';
import { match } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/actions/toast';

export const ProblemEditPage: React.FC<{
  match: match<{ url: string; code: string }>;
}> = (props) => {
  const { url: baseURL, params } = props.match;
  const {
    params: { activePage = 'definition' },
  } = useRouteMatch({ path: `${baseURL}/:activePage?`, strict: true });

  const dispatch = useDispatch();

  let content;
  switch (activePage) {
    case 'definition':
      content = (
        <Segment clearing>
          <Header as="h2">Đề bài</Header>
          <EditProblemForm
            problemCode={params.code}
            onSuccess={() =>
              dispatch(
                addToast({
                  header: 'Cập nhật thành công',
                  content: 'Bạn đã cập nhật đề bài thành công',
                  duration: 2500,
                  status: 'positive',
                })
              )
            }
          />
        </Segment>
      );
      break;
    case 'judge-config':
      content = (
        <Segment clearing>
          <Header as="h2">Chấm bài</Header>
          <UpdateJudgeConfigForm
            problemCode={params.code}
            onSuccess={() => {
              dispatch(
                addToast({
                  header: 'Cập nhật thành công',
                  content: 'Bạn đã cài đặt chấm bài thành công',
                  duration: 2500,
                  status: 'positive',
                })
              );
            }}
          />
        </Segment>
      );
      break;
    case 'rejudge':
      content = (
        <Segment clearing>
          <Header as="h2">Chấm lại</Header>
          <ProblemRejudgeForm problemCode={params.code} />
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
        content="Đề bài"
        to={`${baseURL}/definition`}
        active={activePage === 'definition'}
      />
      <Menu.Item
        as={Link}
        link
        content="Chấm bài"
        to={`${baseURL}/judge-config`}
        active={activePage === 'judge-config'}
      />

      <Menu.Item
        as={Link}
        link
        content="Chấm lại"
        to={`${baseURL}/rejudge`}
        active={activePage === 'rejudge'}
      />
      <Menu.Item as={Link} name="problem-page" to={`/problems/${problemCode}`}>
        <Icon name="arrow left" />
        Quay lại bài tập
      </Menu.Item>
    </Menu>
  );
};
