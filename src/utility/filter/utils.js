import { LogicalOperator } from './LogicalOperator';

export class FilterUtils {
  static joinAnd(cur, and) {
    if (cur) {
      return `${cur}${LogicalOperator.AND}${and}`;
    } else {
      return `${and}`;
    }
  }
}
