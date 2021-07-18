import * as React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { PrincipalSelectors } from '../../store/selectors';
import { SubmissionForm } from '../../domains/submission';
import { Problem } from '../../domains/problem';

export const ProblemSubmitPage: React.FC<{ problem: Problem }> = (props) => {
  const { problem } = props;
  const history = useHistory();
  const user = useSelector(PrincipalSelectors.principal());

  const handleSuccess = React.useCallback(
    (sub) => history.push('my', { highlightSubId: sub.id }),
    []
  );

  return user ? (
    <SubmissionForm problem={problem} onSuccess={handleSuccess} />
  ) : (
    <p>Please login to submit</p>
  );
};
