import { Test } from '../../judge';

export interface TestPackage {
  id: number;

  originalFileName: string;

  tests: Test[];
}
