export interface JudgeConfig {
  timeLimit: number;

  memoryLimit: number;

  judgerType: JudgerType;

  scoringType: ScoringType;

  testPackage: TestPackage;

  customJudger: CustomJudger;
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

export interface TestPackage {
  id: number;

  originalFileName: string;
}

export interface CustomJudger {
  id: number;

  originalFileName: string;
}
