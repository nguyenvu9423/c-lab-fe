import * as React from 'react';
import {
  Segment,
  Header,
  Grid,
  Menu,
  Icon,
  Ref,
  Sticky,
} from 'semantic-ui-react';
import { EditProblemForm, ProblemRejudgeForm } from '@/domain-ui/problem';
import { UpdateJudgeConfigForm } from '@/domain-ui/judge-config';
import { useDispatch } from 'react-redux';
import { addToast } from '@/store/actions/toast';
import { useScrollToTop } from '@/shared/hooks';
import { useMatch, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UnknownException } from '../../shared/exceptions/UnkownException';
import { TOP_NAV_OFFSET } from '../../shared/variables';

export const ProblemEditPage: React.FC = () => {
  const params = useParams<'code'>();
  if (!params.code) {
    throw UnknownException.createDefault();
  }
  const match = useMatch({ path: `problems/${params.code}/edit/:activePage` });
  const activePage = match?.params.activePage ?? 'definition';

  useScrollToTop();
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
                }),
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
                }),
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

  const contextRef = React.useRef<HTMLElement>(null);

  return (
    <Grid container stackable>
      <Ref innerRef={contextRef}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sticky context={contextRef} offset={TOP_NAV_OFFSET}>
              <SectionMenu problemCode={params.code} activePage={activePage} />
            </Sticky>
          </Grid.Column>
          <Grid.Column width={12}>{content}</Grid.Column>
        </Grid.Row>
      </Ref>
    </Grid>
  );
};

const SectionMenu: React.FC<{ problemCode: string; activePage: string }> = (
  props,
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
