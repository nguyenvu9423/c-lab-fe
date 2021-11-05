import { LogicalOperator } from './LogicalOperator';

export namespace FilterUtils {
  export function joinAnd(cur: string, and: string): string {
    if (cur) {
      return `${cur}${LogicalOperator.AND}${and}`;
    } else {
      return `${and}`;
    }
  }
}
