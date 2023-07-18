import { JudgeVerdict, TestVerdict } from './../../../judge';
import { ExpressionNode } from '@rsql/ast';
import { RsqlUtils } from '../../../../utils';

export enum VerdictFilterTypes {
  COMPILE_ERROR = 'COMPILE_ERROR',
  AC = 'ACCEPTED',
  WA = 'WA',
  TLE = 'TLE',
  MLE = 'MLE',
  RE = 'RE',
}

export namespace VerdictFilterTypes {
  export const values = [
    VerdictFilterTypes.AC,
    VerdictFilterTypes.COMPILE_ERROR,
    VerdictFilterTypes.WA,
    VerdictFilterTypes.TLE,
    VerdictFilterTypes.MLE,
    VerdictFilterTypes.RE,
  ];

  export interface Properties {
    text: string;
    rsqlNode?: ExpressionNode;
  }

  export function getProperties(
    verdict: VerdictFilterTypes
  ): VerdictFilterTypes.Properties {
    return verdictMap[verdict];
  }

  const verdictMap: Record<VerdictFilterTypes, VerdictFilterTypes.Properties> =
    {
      [VerdictFilterTypes.AC]: {
        text: 'Accepted',
        rsqlNode: RsqlUtils.Builder.eq(
          'judge.result.verdict',
          JudgeVerdict.ACCEPTED
        ),
      },
      [VerdictFilterTypes.COMPILE_ERROR]: {
        text: 'Compile error',
        rsqlNode: RsqlUtils.Builder.eq(
          'judge.result.verdict',
          JudgeVerdict.COMPILE_ERROR
        ),
      },
      [VerdictFilterTypes.WA]: {
        text: 'Wrong answer',
        rsqlNode: RsqlUtils.Builder.eq(
          'judge.result.testError.verdict',
          TestVerdict.WA
        ),
      },
      [VerdictFilterTypes.TLE]: {
        text: 'Time limit exceeded',
        rsqlNode: RsqlUtils.Builder.eq(
          'judge.result.testError.verdict',
          TestVerdict.TLE
        ),
      },
      [VerdictFilterTypes.MLE]: {
        text: 'Memory limit exceeded',
        rsqlNode: RsqlUtils.Builder.eq(
          'judge.result.testError.verdict$',
          TestVerdict.MLE
        ),
      },
      [VerdictFilterTypes.RE]: {
        text: 'Runtime error',
        rsqlNode: RsqlUtils.Builder.eq(
          'judge.result.testError.verdict',
          TestVerdict.RE
        ),
      },
    };
}
