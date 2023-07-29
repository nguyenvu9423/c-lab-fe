import * as React from 'react';

import { Container, Segment, Header } from 'semantic-ui-react';
import { AddProblemForm } from '@/domain-ui/problem';
import { useDispatch, useSelector } from 'react-redux';
import { addToast } from '@/store/actions';
import { useScrollToTop } from '@/shared/hooks';
import { useNavigate } from 'react-router';
import { CRUDToastBuilder } from '@/components/toast';
import { AuthorizationSelectors } from '@/store/selectors';
import { PageErrorMessage } from '../shared';

export const AddProblemPage: React.FC = () => {
  useScrollToTop();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitSuccess = React.useCallback(
    (problem) => {
      navigate(`/problems/${problem.code}`);
      dispatch(
        addToast(
          new CRUDToastBuilder('bài tập', 'tạo').setStatus('success').build(),
        ),
      );
    },
    [dispatch, navigate],
  );

  const canAddProblem = useSelector(AuthorizationSelectors.canCreateProblem());
  if (!canAddProblem) {
    return <PageErrorMessage message="Bạn không có quyền truy cập trang này" />;
  }

  return (
    <Container>
      <Segment clearing>
        <Header as="h2">Tạo bài tập</Header>
        <AddProblemForm onSuccess={handleSubmitSuccess} />
      </Segment>
    </Container>
  );
};
