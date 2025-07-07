import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Container, Header, Segment } from 'semantic-ui-react';

import { CRUDToastBuilder } from '@/components/toast';
import { AddContestForm } from '@/domain-ui/contest/forms/AddContestForm';
import { useScrollToTop } from '@/shared/hooks';
import { addToast } from '@/store/actions';

export const AddContestPage: React.FC = () => {
  useScrollToTop();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitSuccess = React.useCallback(
    (contest) => {
      navigate(`/contests/${contest.id}`);
      dispatch(
        addToast(
          new CRUDToastBuilder('kỳ thi', 'tạo').setStatus('success').build(),
        ),
      );
    },
    [dispatch, navigate],
  );

  return (
    <Container>
      <Segment clearing>
        <Header as="h2">Tạo kỳ thi</Header>
        <AddContestForm onSuccess={handleSubmitSuccess} />
      </Segment>
    </Container>
  );
};
