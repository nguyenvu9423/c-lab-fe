import * as React from 'react';

import { Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { AddProblemForm } from '../../domains/problem/forms';

function BaseAddProblemPage(props) {
  const { history } = props;

  const handleSubmitSuccess = React.useCallback(
    problem => {
      history.push(`/problems/${problem.code}`);
    },
    [history]
  );

  return (
    <Container>
      <AddProblemForm onSubmitSuccess={handleSubmitSuccess} />
    </Container>
  );
}

export const AddProblemPage = withRouter(BaseAddProblemPage);
