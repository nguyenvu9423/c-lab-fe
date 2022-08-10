import { parse as rsqlParse } from '@rsql/parser';
import RsqlBuilder from '@rsql/builder';
import { emit as rsqlEmit } from '@rsql/emitter';

export namespace RsqlUtils {
  export const parse = rsqlParse;
  export const Builder = RsqlBuilder;
  export const emit = rsqlEmit;
}
