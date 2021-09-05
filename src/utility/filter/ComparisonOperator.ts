export enum ComparisonOperator {
  EQUAL = '==',
  GREATER_THAN_OR_EQUAL = '=ge=',
  LESS_THAN_OR_EQUAL = '=le=',
}

export namespace ComparisonOperator {
  export const values = [
    ComparisonOperator.EQUAL,
    ComparisonOperator.GREATER_THAN_OR_EQUAL,
    ComparisonOperator.LESS_THAN_OR_EQUAL,
  ];

  export function getDisplayedValue(operator: ComparisonOperator): string {
    return displayMap[operator];
  }

  const displayMap = {
    [ComparisonOperator.EQUAL]: '=',
    [ComparisonOperator.GREATER_THAN_OR_EQUAL]: '>=',
    [ComparisonOperator.LESS_THAN_OR_EQUAL]: '<=',
  };
}
