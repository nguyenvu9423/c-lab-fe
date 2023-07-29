import { Test } from '../../judge/test/Test';

export interface TestPackage {
  id: number;

  originalFileName: string;

  tests: Test[];
}
