import * as React from 'react';
import { CodeSubmissionForm } from './components/CodeSubmissionForm';

export function ProblemSubmitPage(props) {
  const { problemId } = props;
  return <CodeSubmissionForm problemId={problemId} />;
}
