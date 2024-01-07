export interface JudgeConfig {
  timeLimit: number;

  memoryLimit: number;

  judgeType: JudgeType;
}

export enum TestJudgeType {
  LinesWordsCase = 'LinesWordsCase',
  Custom = 'Custom',
}

export namespace TestJudgeType {
  export const values = [TestJudgeType.LinesWordsCase, TestJudgeType.Custom];
}

export enum JudgeType {
  ACM = 'ACM',
  OI = 'OI',
}

export namespace JudgeType {
  export const values = [JudgeType.ACM, JudgeType.OI];
}
