import * as React from 'react';
import { TestVerdict } from '../../../domains/submission/result/TestVerdict';
import { AcceptedStatusLabel, ErrorStatusLabel } from './status-labels';

function SubmissionTestResultLabel(props) {
  const { testResult } = props;
  const verdict = TestVerdict.valueOf(testResult.verdict);
  const message = `${verdict.description} on test ${testResult.testId}`;
  if (verdict === TestVerdict.AC) {
    return <AcceptedStatusLabel message={message} />;
  } else {
    return <ErrorStatusLabel message={message} />;
  }
}

function TestResultLabel(props) {
  const { testResult } = props;
  const { verdict: verdictName, resource } = testResult;
  const verdict = TestVerdict.getByName(verdictName);
  const message = verdict.description;

  if (verdict === TestVerdict.AC) {
    return (
      <span>
        <AcceptedStatusLabel message={message} />
        <span floated="right">
          {' '}
          | Time: {resource.time} ms, Memory: {resource.memory} mb
        </span>
      </span>
    );
  } else {
    return <ErrorStatusLabel message={message} />;
  }
}

export { SubmissionTestResultLabel, TestResultLabel };
