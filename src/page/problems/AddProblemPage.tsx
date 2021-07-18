import * as React from 'react';

import { Container, Segment, Header } from 'semantic-ui-react';
import { AddProblemForm } from '../../domains/problem';
import { useHistory } from 'react-router';

export const AddProblemPage: React.FC = () => {
  const history = useHistory();

  const handleSubmitSuccess = React.useCallback(
    (problem) => {
      history.push(`/problems/${problem.code}`);
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
