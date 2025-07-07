import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMatch, useParams } from 'react-router';
import {
  Grid,
  Header,
  Icon,
  Menu,
  Ref,
  Segment,
  Sticky,
} from 'semantic-ui-react';

import { UnknownException } from '@/shared/exceptions';
import { useScrollToTop } from '@/shared/hooks';
import { addToast } from '@/store/actions';
import {
  ContestRejudgeForm,
  EditContestForm,
  UpdateContestJudgeConfigForm,
} from '@/domain-ui/contest';
import { TOP_NAV_OFFSET } from '../../shared/variables';

export const EditContestPage: React.FC = () => {
  const params = useParams<'id'>();
  if (!params.id) {
    throw UnknownException.createDefault();
  }
  const contestId = Number(params.id);

  useScrollToTop();
  const dispatch = useDispatch();

  const match = useMatch({ path: `contests/${params.id}/edit/:activePage` });
  const activePage = match?.params.activePage ?? 'definition';

  const contextRef = React.useRef<HTMLElement>(null);

  const handleEditSuccess = React.useCallback(
    () =>
      dispatch(
        addToast({
          header: 'Cập nhật thành công',
          content: 'Bạn đã cập nhật kỳ thi thành công',
          duration: 2500,
          status: 'positive',
        }),
      ),
    [dispatch],
  );

  let content;
  switch (activePage) {
    case 'definition':
      content = (
        <Segment clearing>
          <Header as="h2">Thông tin</Header>
          <EditContestForm
            contestId={contestId}
            onSuccess={handleEditSuccess}
          />
        </Segment>
      );
      break;
    case 'judge':
      content = (
        <Segment clearing>
          <Header as="h2">Chấm kỳ thi</Header>
          <UpdateContestJudgeConfigForm
            contestId={contestId}
            onSuccess={handleEditSuccess}
          />
        </Segment>
      );
      break;
    case 'rejudge':
      content = (
        <Segment clearing>
          <Header as="h2">Chấm lại</Header>
          <ContestRejudgeForm contestId={contestId} />
        </Segment>
      );
      break;
    default:
      content = undefined;
  }

  return (
    <Grid container stackable>
      <Ref innerRef={contextRef}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sticky context={contextRef} offset={TOP_NAV_OFFSET}>
              <SectionMenu contestId={params.id} activePage={activePage} />
            </Sticky>
          </Grid.Column>
          <Grid.Column width={12}>{content}</Grid.Column>
        </Grid.Row>
      </Ref>
    </Grid>
  );
};

const SectionMenu: React.FC<{ contestId: string; activePage: string }> = (
  props,
) => {
  const { contestId, activePage } = props;
  const baseURL = `/contests/${contestId}/edit`;

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
        content="Bài tập"
        to={`${baseURL}/judge`}
        active={activePage === 'judge'}
      />

      <Menu.Item
        as={Link}
        link
        content="Chấm lại"
        to={`${baseURL}/rejudge`}
        active={activePage === 'rejudge'}
      />
      <Menu.Item as={Link} name="problem-page" to={`/contests/${contestId}`}>
        <Icon name="arrow left" />
        Quay lại bài tập
      </Menu.Item>
    </Menu>
  );
};
