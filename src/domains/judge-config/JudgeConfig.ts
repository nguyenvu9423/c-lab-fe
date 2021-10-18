import { CustomJudger } from './custom-judger';
import { TestPackage } from './test-package';

export interface JudgeConfig {
  timeLimit: number;

  memoryLimit: number;

  scoringType: ScoringType;
}

export enum JudgerType {
  LinesWordsCase = 'LinesWordsCase',
  Custom = 'Custom',
}

export namespace JudgerType {
  export const values = [JudgerType.LinesWordsCase, JudgerType.Custom];
}

export enum ScoringType {
  ACM = 'ACM',
  OI = 'OI',
}

export namespace ScoringType {
  export const values = [ScoringType.ACM, ScoringType.OI];
}
