import * as React from 'react';
import { ErrorLabel, ScoreLabel, AcceptedLabel } from './ui-labels';
import { SubmissionTestResultLabel } from './test-result-labels';
import { JudgeType } from '@/domains/judge-config';
import { LabelStyles } from './shared';
import { LabelProps } from 'semantic-ui-react';
import { JudgeResult, JudgeVerdict } from '@/domains/judge';

export namespace JudgeResultLabel {
  export interface Props extends LabelStyles {
    result: JudgeResult;
    judgeType: JudgeType;
  }
}

export const JudgeResultLabel: React.FC<JudgeResultLabel.Props> = (props) => {
  const { result, judgeType, compact } = props;
  const { verdict } = result;
  switch (verdict) {
    case JudgeVerdict.COMPILE_ERROR:
      return <ErrorLabel message="Compile error" />;
    case JudgeVerdict.ACCEPTED:
    case JudgeVerdict.TEST_ERROR:
      switch (judgeType) {
        case JudgeType.OI:
          return <OIJudgeResultLabel result={result} />;
        case JudgeType.ACM:
          return <AcmJudgeResultLabel result={result} compact={compact} />;
        default:
          return null;
      }
    default:
      return null;
  }
};

const OIJudgeResultLabel: React.FC<{ result: JudgeResult }> = (props) => {
  const { result } = props;
  const { verdict, score } = result;
  switch (verdict) {
    case JudgeVerdict.ACCEPTED:
    case JudgeVerdict.TEST_ERROR:
      return <ScoreLabel score={score ? score * 100 : 0} />;
    default:
      return null;
  }
};

const AcmJudgeResultLabel: React.FC<{ result: JudgeResult } & LabelProps> = (
  props,
) => {
  const { result, compact } = props;
  const { verdict, testError } = result;
  switch (verdict) {
    case JudgeVerdict.ACCEPTED:
      return <AcceptedLabel message="Accepted" />;
    case JudgeVerdict.TEST_ERROR:
      return testError ? (
        <SubmissionTestResultLabel testResult={testError} compact={compact} />
      ) : null;
    default:
      return null;
  }
};
