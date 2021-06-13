import * as React from 'react';
import { ComparisonOperator } from '../../../../utility/filter';

export function useOperationOptions() {
  const operationOptions = React.useMemo(
    () =>
      OperationTypes.map(({ title, id }) => ({
        key: id,
        value: id,
        text: title,
      })),
    []
  );

  const mapValueToOperation = React.useCallback(
    (value) => OperationTypes.find((type) => type.id === value),
    []
  );
  return { operationOptions, mapValueToOperation };
}

const OperationTypes = [
  {
    title: '<>',
    operator: undefined,
  },
  {
    title: '=',
    operator: ComparisonOperator.EQUAL,
  },
  {
    title: '<=',
    operator: ComparisonOperator.LESS_THAN_OR_EQUAL,
  },
  {
    title: '>=',
    operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
  },
].map((item, id) => ({ id, ...item }));
