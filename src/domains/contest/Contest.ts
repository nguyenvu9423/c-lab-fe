import { ContestJudgeConfig } from './ContestJudgeConfig';

export interface Contest {
  id: number;

  name: string;

  author: {
    id: number;

    username: string;

    firstName: string;

    lastName: string;
  };

  description: string;

  overview: string;

  start: string;

  end: string;

  createdAt: string;

  judgeConfig?: ContestJudgeConfig;
}
