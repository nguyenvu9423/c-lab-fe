import React from 'react';
import { Grid, Message, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AuthorizationSelectors } from '@/store/selectors';
import { ContestInfoCard, ContestProblemSubmitForm } from './components';
import { BaseContestContentProps } from './shared';

export namespace ContestSubmitContent {
  export interface Props extends BaseContestContentProps {}
}

export const ContestSubmitContent: React.FC<ContestSubmitContent.Props> = (
  props,
) => {
  const { contest, nav } = props;

  const canSubmit = useSelector(
    AuthorizationSelectors.canCreateContestSubmission(contest.id),
  );

  const navigate = useNavigate();
  const handleSuccess = React.useCallback(
    (sub) => navigate('../my', { state: { highlightSubId: sub.id } }),
    [navigate],
  );

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          {nav}
          {canSubmit ? (
            <Segment>
              <ContestProblemSubmitForm
                contest={contest}
                onSuccess={handleSuccess}
              />
            </Segment>
          ) : (
            <Message warning>
              Bạn chưa có quyền nộp bài. Hãy đăng nhập hoặc đăng kí nếu bạn chưa
              có tài khoản.
            </Message>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <ContestInfoCard contest={contest} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
