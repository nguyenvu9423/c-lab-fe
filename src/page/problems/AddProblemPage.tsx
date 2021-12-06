import * as React from 'react';

import { Container, Segment, Header } from 'semantic-ui-react';
import { AddProblemForm } from '../../domains/problem';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/actions/toast';
import { useScrollToTop } from '../../common/hooks';
import { useNavigate } from 'react-router';

export const AddProblemPage: React.FC = () => {
  useScrollToTop();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitSuccess = React.useCallback(
    (problem) => {
      navigate(`/problems/${problem.code}`);
      dispatch(
        addToast({
          header: 'Add problem',
          content: 'Problem has been added successfully',
          duration: 2500,
          status: 'positive',
        })
      );
    },
    [dispatch, navigate]
  );

  return (
    <Container>
      <Segment clearing>
        <Header as="h2">Add problem</Header>
        <AddProblemForm onSuccess={handleSubmitSuccess} />
      </Segment>
    </Container>
  );
};
