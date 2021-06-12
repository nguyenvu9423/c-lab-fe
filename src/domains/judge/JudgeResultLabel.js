import * as React from 'react';
import { ScoringType } from '../judge-config/ScoringType';
import { JudgeVerdict } from './JudgerVerdict';
import { ErrorLabel, ScoreLabel, AcceptedLabel } from './ui-labels';
import { SubmissionTestResultLabel } from './test-result-labels';

export function JudgeResultLabel(props) {
  const { result, scoringType } = props;
  const { verdict } = result;
  switch (verdict) {
    case JudgeVerdict.COMPILE_ERROR:
      return <ErrorLabel message="Compile error" />;
    case JudgeVerdict.ACCEPTED:
    case JudgeVerdict.TEST_ERROR:
      switch (scoringType) {
        case ScoringType.OI:
          return <OIJudgeResultLabel result={result} />;
        case ScoringType.ACM:
          return <AcmJudgeResultLabel result={result} />;
        default:
          return null;
      }
    default:
      return null;
  }
}

function OIJudgeResultLabel(props) {
  const { result } = props;
  const { verdict, score } = result;
  switch (verdict) {
    case JudgeVerdict.ACCEPTED:
    case JudgeVerdict.TEST_ERROR:
      return <ScoreLabel score={score * 100} />;
    default:
      return null;
  }
}

function AcmJudgeResultLabel(props) {
  const { result } = props;
  const { verdict, testError } = result;
  switch (verdict) {
    case JudgeVerdict.ACCEPTED:
      return <AcceptedLabel message="Accepted" />;
    case JudgeVerdict.TEST_ERROR:
      return <SubmissionTestResultLabel testResult={testError} />;
    default:
      return null;
  }
}
