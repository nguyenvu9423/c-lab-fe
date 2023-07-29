import * as React from 'react';

import { useSelector } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import { AuthorizationSelectors } from '@/store/selectors';
import { SubmissionForm } from '@/domain-ui/submission';
import { Problem } from '@/domains/problem';
import { TagContainer } from '@/components';
import { useNavigate } from 'react-router';
import { ProblemNavMenu, ProblemInfoCard } from '../components';

export const ProblemSubmitContent: React.FC<{ problem: Problem }> = (props) => {
  const { problem } = props;
  const navigate = useNavigate();
  const canSubmit = useSelector(AuthorizationSelectors.canSubmit());

  const handleSuccess = React.useCallback(
    (sub) => navigate('../my', { state: { highlightSubId: sub.id } }),
    [history],
  );

  return (
    <>
      <Grid.Column width={12}>
        <ProblemNavMenu problem={problem} tabName="submit" />
        <Segment attached="bottom">
          {canSubmit ? (
            <SubmissionForm problem={problem} onSuccess={handleSuccess} />
          ) : (
            <p>
              Bạn chưa có quyền nộp bài. Hãy đăng nhập hoặc đăng kí nếu bạn chưa
              có tài khoản.
            </p>
          )}
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <ProblemInfoCard problem={problem} />
        <TagContainer ids={problem.tags} />
      </Grid.Column>
    </>
  );
};
