import * as React from 'react';
import { AcceptedLabel, ErrorLabel, ScoreLabel } from './ui-labels';
import { ScoringType } from '@/domains/judge-config';
import { DetailedTestResult, TestResult, TestVerdict } from '@/domains/judge';
import { LabelStyles } from './shared';

export namespace SubmissionTestResultLabel {
  export interface Props extends LabelStyles {
    testResult: TestResult;
  }
}

export const SubmissionTestResultLabel: React.FC<
  SubmissionTestResultLabel.Props
> = (props) => {
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
          <ScoreLabel style={{ marginLeft: 8 }} score={score * 100} />, | Time:{' '}
          {resource.time} ms, Memory: {resource.memory} mb
        </span>
      );
    }
    case ScoringType.ACM: {
      const { verdict, resource } = testResult;
      const message = TestVerdict.getMessage(verdict);

      if (verdict === TestVerdict.AC) {
        return (
          <span>
            <AcceptedLabel message={message} />,{' '}
            <span>
              {resource.time} ms / {resource.memory} mb
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
