import * as React from 'react';
import { CodeSubmissionForm } from './components/CodeSubmissionForm';
import { useSelector } from 'react-redux';
import { UserSelectors } from '../../store/selectors';

export function ProblemSubmitPage(props) {
  const { problem } = props;
  const user = useSelector(UserSelectors.loginUser());

  return user ? (
    <CodeSubmissionForm problem={problem} user={user} />
  ) : (
    <div>Please login to submit</div>
  );
}
