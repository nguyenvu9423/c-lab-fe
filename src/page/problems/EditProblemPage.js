import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { fetchProblemById } from '../../store/actions/problem';
import { ProblemSelectors } from '../../store/selectors';
import { EditProblemForm } from './components/EditProblemForm';
import { fetchTestPackages } from '../../store/actions/testPackage';

function BaseEditProblemPage(props) {
  const { id, fetchProblemById, initialProblem, history } = props;
  React.useEffect(() => {
    fetchProblemById({ id });
  }, []);

  const handleSubmitSucess = React.useCallback(response => {
    const { data } = response;
    history.push(`/problems/${data.code}`);
  }, []);
  if (!initialProblem) {
    return null;
  }
  return (
    <Container>
      <EditProblemForm
        initialProblem={initialProblem}
        onSubmitSuccess={handleSubmitSucess}
      />
    </Container>
  );
}

export const EditProblemPage = withRouter(
  connect(
    (state, ownProps) => {
      const {
        match: {
          params: { id }
        }
      } = ownProps;
      const initialProblem = ProblemSelectors.byId(id)(state);
      return {
        id,
        initialProblem
      };
    },
    {
      fetchProblemById: fetchProblemById.request,
      fetchTestPackages: fetchTestPackages.request
    }
  )(BaseEditProblemPage)
);
