import { User } from '../user';
import { Contest } from './Contest';
import { Problem } from '../problem';
import { Resource } from '../judge/Resource';

export type ContestUserProblemResult =
  | AcmContestUserProblemResult
  | OIContestUserProblemResult;

export interface AcmContestUserProblemResult
  extends BaseContestUserProblemResult {
  penalty: number;
  tryCount: number;
}

export interface OIContestUserProblemResult
  extends BaseContestUserProblemResult {
  resource: Resource;
}

export interface BaseContestUserProblemResult {
  contest: Contest;

  user: User;

  problem: Problem;

  score: number;
}
