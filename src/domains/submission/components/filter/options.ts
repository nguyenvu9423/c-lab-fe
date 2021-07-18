import { JudgeVerdict, TestVerdict } from './../../../judge/judge-result';
import { ComparisonOperator } from './../../../../utility/filter/ComparisonOperator';

export enum VerdictFilterTypes {
  ANY = 'ANY',
  ACCEPTED = 'ACCEPTED',
  COMPILE_ERROR = 'COMPILE_ERROR',
  WA = 'Wrong answer',
  TLE = 'Time limit exceeded',
  MLE = 'Memory limti exceeded',
  RE = 'Runtime error',
}

export namespace VerdictFilterTypes {
  export const values = [
    VerdictFilterTypes.ANY,
    VerdictFilterTypes.ACCEPTED,
    VerdictFilterTypes.COMPILE_ERROR,
    VerdictFilterTypes.WA,
    VerdictFilterTypes.TLE,
    VerdictFilterTypes.MLE,
    VerdictFilterTypes.RE,
  ];

  export interface Properties {
    text: string;
    query?: string;
  }

  export function getProperties(
    verdict: VerdictFilterTypes
  ): VerdictFilterTypes.Properties {
    return verdictMap[verdict];
  }

  const verdictMap: Record<VerdictFilterTypes, VerdictFilterTypes.Properties> =
    {
      [VerdictFilterTypes.ANY]: {
        text: 'Any',
      },
      [VerdictFilterTypes.ACCEPTED]: {
        text: 'Accepted',
        query: `judge.result.verdict${ComparisonOperator.EQUAL}${JudgeVerdict.ACCEPTED}`,
      },
      [VerdictFilterTypes.COMPILE_ERROR]: {
        text: 'Compile error',
        query: `judge.result.verdict${ComparisonOperator.EQUAL}${JudgeVerdict.COMPILE_ERROR}`,
      },
      [VerdictFilterTypes.WA]: {
        text: 'Wrong answer',
        query: `judge.result.testError.verdict${ComparisonOperator.EQUAL}${TestVerdict.WA}`,
      },
      [VerdictFilterTypes.TLE]: {
        text: 'Time limit exceeded',
        query: `judge.result.testError.verdict${ComparisonOperator.EQUAL}${TestVerdict.TLE}`,
      },
      [VerdictFilterTypes.MLE]: {
        text: 'Memory limit exceeded',
        query: `judge.result.testError.verdict${ComparisonOperator.EQUAL}${TestVerdict.MLE}`,
      },
      [VerdictFilterTypes.RE]: {
        text: 'Runtime error',
        query: `judge.result.testError.verdict${ComparisonOperator.EQUAL}${TestVerdict.RE}`,
      },
    };
}

export enum OperationFilterTypes {
  NONE = '<>',
  EQUAL = '=',
  LOE = '<=',
  GOE = '>=',
}

export namespace OperationFilterTypes {
  export const values = [
    OperationFilterTypes.NONE,
    OperationFilterTypes.EQUAL,
    OperationFilterTypes.LOE,
    OperationFilterTypes.GOE,
  ];

  export function getOperator(
    operation: OperationFilterTypes
  ): ComparisonOperator | undefined {
    return operationMap[operation];
  }
}

const operationMap: Record<
  OperationFilterTypes,
  ComparisonOperator | undefined
> = {
  [OperationFilterTypes.NONE]: undefined,
  [OperationFilterTypes.EQUAL]: ComparisonOperator.EQUAL,
  [OperationFilterTypes.LOE]: ComparisonOperator.LESS_THAN_OR_EQUAL,
  [OperationFilterTypes.GOE]: ComparisonOperator.GREATER_THAN_OR_EQUAL,
};
