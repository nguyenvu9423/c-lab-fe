import { Selector } from '@reduxjs/toolkit';

export namespace ConstSelectors {
  export function value<T>(value: T): Selector<any, T> {
    return () => value;
  }
}
