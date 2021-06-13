import * as React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { CodeSubmissionForm } from './components/CodeSubmissionForm';
import { PrincipalSelectors } from '../../store/selectors';

export function ProblemSubmitPage(props) {
  const { problem } = props;
  const history = useHistory();
  const user = useSelector(PrincipalSelectors.principal());

  const handleSuccess = React.useCallback(
    (sub) => history.push('my', { highlightSubId: sub.id }),
    []
  );

  return user ? (
    <CodeSubmissionForm
      problem={problem}
      user={user}
      onSuccess={handleSuccess}
    />
  ) : (
    <p>Please login to submit</p>
  );
}
