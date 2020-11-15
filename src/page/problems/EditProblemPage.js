import * as React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { EditProblemForm } from '../../domains/problem';

export function ProblemEditPage(props) {
  const {
    history,
    match: { params }
  } = props;

  const handleSuccess = React.useCallback(data => {
    history.push(`/problems/${data.code}`);
  }, []);

  const handleCancel = React.useCallback(() => {
    history.goBack();
  }, []);

  return (
    <Container>
      <Segment clearing>
        <Header as="h2">Edit problem</Header>
        <EditProblemForm
          problemId={params.id}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </Segment>
    </Container>
  );
}
