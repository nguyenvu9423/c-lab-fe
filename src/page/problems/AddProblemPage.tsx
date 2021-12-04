import * as React from 'react';

import { Container, Segment, Header } from 'semantic-ui-react';
import { AddProblemForm } from '../../domains/problem';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/actions/toast';
import { useScrollToTop } from '../../common/hooks';

export const AddProblemPage: React.FC = () => {
  useScrollToTop();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmitSuccess = React.useCallback(
    (problem) => {
      history.push(`/problems/${problem.code}`);
      dispatch(
        addToast({
          header: 'Add problem',
          content: 'Problem has been added successfully',
          duration: 2500,
          status: 'positive',
        })
      );
    },
    [history]
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
