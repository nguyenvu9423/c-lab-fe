export interface Problem {
  id: number;

  code: string;

  title: string;

  author: number;

  definition: string;

  judgeConfig?: number;

  tags: number[];
}

export interface DetailedProblem extends Problem {
  problemRejudge?: number;
}
