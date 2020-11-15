import * as React from 'react';
import { ComparisonOperator } from '../../../../utility/filter';
import { SubmissionVerdict } from '../../result/SubmissionVerdict';
import { TestVerdict } from '../../result/TestVerdict';

export function useVerdictOptions() {
  const verdictOptions = React.useMemo(
    () =>
      VerdictTypes.map(item => ({
        key: item.id,
        value: item.id,
        text: item.title
      })),
    []
  );
  const mapValueToVerdict = React.useCallback(
    value => VerdictTypes.find(item => item.id === value),
    []
  );
  return { verdictOptions, mapValueToVerdict };
}

const VerdictTypes = [
  { title: 'Any' },
  {
    title: 'Accepted',
    query: `result.verdict${ComparisonOperator.EQUAL}${SubmissionVerdict.ACCEPTED.name}`
  },
  {
    title: 'Compile error',
    query: `result.verdict${ComparisonOperator.EQUAL}${SubmissionVerdict.COMPILE_ERROR.name}`
  },
  {
    title: 'Wrong answer',
    query: `result.testError.verdict${ComparisonOperator.EQUAL}${TestVerdict.WA.name}`
  },
  {
    title: 'Time limit exceeded',
    query: `result.testError.verdict${ComparisonOperator.EQUAL}${TestVerdict.TLE.name}`
  },
  {
    title: 'Memory limit exceeded',
    query: `result.testError.verdict${ComparisonOperator.EQUAL}${TestVerdict.MLE.name}`
  },
  {
    title: 'Runtime error',
    query: `result.testError.verdict${ComparisonOperator.EQUAL}${TestVerdict.RE.name}`
  }
].map((item, id) => ({
  id,
  ...item
}));
