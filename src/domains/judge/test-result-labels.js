import * as React from 'react';
import { TestVerdict } from './TestVerdict';
import { AcceptedLabel, ErrorLabel, ScoreLabel } from './ui-labels';
import { ScoringType } from '../judge-config';

export function SubmissionTestResultLabel(props) {
  const { testResult } = props;
  const { verdict, testId } = testResult;

  const message = `${TestVerdict.getMessage(verdict)} on test ${testId}`;
  if (verdict === TestVerdict.AC) {
    return <AcceptedLabel message={message} />;
  } else {
    return <ErrorLabel message={message} />;
  }
}

export function TestResultLabel(props) {
  const { testResult, scoringType } = props;

  switch (scoringType) {
    case ScoringType.OI: {
      const { score, resource } = testResult;
      return (
        <span>
          <ScoreLabel style={{ marginLeft: 8 }} score={score * 100} />
          <span floated="right">
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
            <span floated="right">
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
}
