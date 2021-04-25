import * as React from 'react';
import { ScoringType } from '../../../domains/judge-config/ScoringType';
import { SubmissionVerdict } from '../../../domains/submission/result/SubmissionVerdict';
import { ErrorLabel, ScoreLabel, AcceptedLabel } from './ui-labels';
import { SubmissionTestResultLabel } from './test-result-labels';

export function SubmissionResultLabel(props) {
  const { result, scoringType } = props;
  const { verdict } = result;
  switch (verdict) {
    case SubmissionVerdict.COMPILE_ERROR:
      return <ErrorLabel message="Compile error" />;
    case SubmissionVerdict.ACCEPTED:
    case SubmissionVerdict.TEST_ERROR:
      switch (scoringType) {
        case ScoringType.OI:
          return <OISubmissionResultLabel result={result} />;
        case ScoringType.ACM:
          return <AcmSubmissionResultLabel result={result} />;
        default:
          return null;
      }
    default:
      return null;
  }
}

function OISubmissionResultLabel(props) {
  const { result } = props;
  const { verdict, score } = result;
  switch (verdict) {
    case SubmissionVerdict.ACCEPTED:
    case SubmissionVerdict.TEST_ERROR:
      return <ScoreLabel score={score * 100} />;
    default:
      return null;
  }
}

function AcmSubmissionResultLabel(props) {
  const { result } = props;
  const { verdict, testError } = result;
  switch (verdict) {
    case SubmissionVerdict.ACCEPTED:
      return <AcceptedLabel message="Accepted" />;
    case SubmissionVerdict.TEST_ERROR:
      return <SubmissionTestResultLabel testResult={testError} />;
    default:
      return null;
  }
}
