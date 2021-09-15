import * as React from 'react';
import { TestVerdict } from './test';
import { AcceptedLabel, ErrorLabel, ScoreLabel } from './ui-labels';
import { ScoringType } from '../judge-config';
import { DetailedTestResult, TestResult } from '.';

export const SubmissionTestResultLabel: React.FC<{ testResult: TestResult }> = (
  props
) => {
  const { testResult } = props;
  const { verdict, testId } = testResult;

  const message = `${TestVerdict.getMessage(verdict)} on test ${testId}`;
  if (verdict === TestVerdict.AC) {
    return <AcceptedLabel message={message} />;
  } else {
    return <ErrorLabel message={message} />;
  }
};

export const TestResultLabel: React.FC<{
  testResult: DetailedTestResult;
  scoringType: ScoringType;
}> = (props) => {
  const { testResult, scoringType } = props;

  switch (scoringType) {
    case ScoringType.OI: {
      const { score, resource } = testResult;
      return (
        <span>
          <ScoreLabel style={{ marginLeft: 8 }} score={score * 100} />
          <span style={{ float: 'right' }}>
            {' '}
            | Time: {resource.time} ms, Memory: {resource.memory} mb
          </span>
        </span>
      );
    }
    case ScoringType.ACM: {
      const { verdict, resource } = testResult;
      const message = TestVerdict.getMessage(verdict);

      if (verdict === TestVerdict.AC) {
        return (
          <span>
            <AcceptedLabel message={message} />
            <span style={{ float: 'right' }}>
              {' '}
              | Time: {resource.time} ms, Memory: {resource.memory} mb
            </span>
          </span>
        );
      } else {
        return <ErrorLabel message={message} />;
      }
    }
    default:
      throw new Error('Unknown scoring type');
  }
};
