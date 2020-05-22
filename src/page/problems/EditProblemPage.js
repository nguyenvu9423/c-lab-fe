import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { fetchProblemById } from '../../store/actions/problem';
import {
  ProblemSelectors,
  ProblemEditPageSelectors
} from '../../store/selectors';
import { EditProblemForm } from '../../domains/problem/forms';
import { fetchTestPackages } from '../../store/actions/testPackage';
import { LoadingState } from '../../store/common';
import { ErrorMessage, LoadingIndicator } from '../../components';
import { Target } from '../../store/reducers/targets';
import { useDispatch } from 'react-redux';
import { resetState } from '../../store/actions/state';

export function ProblemEditPage(props) {
  const {
    match: { params }
  } = props;
  const dispatch = useDispatch(Target.PROBLEM_EDIT_PAGE);
  const history = useHistory();
  React.useEffect(() => {
    dispatch(
      fetchProblemById.request(params.id, { target: Target.PROBLEM_EDIT_PAGE })
    );
    return () => {
      dispatch(resetState({ target: Target.PROBLEM_EDIT_PAGE }));
    };
  }, []);

  const handleSubmitSucess = React.useCallback(response => {
    history.push(`/problems/${response.data.code}`);
  }, []);

  const problemData = useSelector(ProblemEditPageSelectors.problem());
  const problem = useSelector(ProblemSelectors.byId(problemData.id));

  const handleCancel = React.useCallback(() => {
    if (problem) {
      history.push(`/problems/${problem.code}`);
    }
  }, [history, problem]);

  if (LoadingState.isInProgress(problemData.loadingState)) {
    return <LoadingIndicator />;
  }
  if (problemData.loadingState === LoadingState.ERROR) {
    return (
      <Container>
        <ErrorMessage message={problemData.error.message} />
      </Container>
    );
  }

  return (
    <Container>
      <EditProblemForm
        initialProblem={problem}
        onSubmitSuccess={handleSubmitSucess}
        onCancel={handleCancel}
      />
    </Container>
  );
}
