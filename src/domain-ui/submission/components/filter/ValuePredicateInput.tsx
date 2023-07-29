import React from 'react';
import { Input, Select } from 'semantic-ui-react';
import { ComparisonOperator } from '@rsql/ast';
import { operationOptions } from './shared';

export namespace ValuePredicateInput {
  export interface Props {
    value?: Predicate;
    onChange?(value: Predicate | undefined): void;
    unit?: string;
    min?: number;
    max?: number;
  }

  export interface Predicate {
    operator: ComparisonOperator;
    value: number;
  }
}

export const ValuePredicateInput: React.FC<ValuePredicateInput.Props> = (
  props,
) => {
  const { value, onChange } = props;
  return (
    <div className="test-count-predicate-input">
      <Select
        className="operator-input"
        name="operation"
        placeholder="=, <="
        compact
        options={operationOptions}
        value={value?.operator}
        onChange={(event, { value: operator }) => {
          if (operator === undefined) {
            onChange?.(undefined);
          } else {
            onChange?.({
              operator: operator as ComparisonOperator,
              value: value?.value ?? 0,
            });
          }
        }}
      />
      <Input
        name="testCount"
        type="number"
        min={props.min}
        max={props.max}
        fluid
        label={props.unit}
        labelPosition="right"
        disabled={!value}
        value={value?.value}
        onChange={(event, { value: testCount }) => {
          onChange?.({
            operator: value?.operator as ComparisonOperator,
            value: Number(testCount),
          });
        }}
      />
    </div>
  );
};
