import { Resource } from '../judge/Resource';
import { User } from '../user';
import { Contest } from './Contest';
import {
  AcmContestUserProblemResult,
  ContestUserProblemResult,
  OIContestUserProblemResult,
} from './ContestUserProblemResult';

export type ContestUserResult = AcmContestUserResult | OIContestUserResult;

export interface AcmContestUserResult
  extends BaseContestUserResult<AcmContestUserProblemResult> {
  penalty: number;
}

export function isAcmContestUserResult(
  result: ContestUserResult,
): result is AcmContestUserResult {
  return 'penalty' in result;
}

export interface OIContestUserResult
  extends BaseContestUserResult<OIContestUserProblemResult> {
  totalResource: Resource;
}

export function isOIContestUserResult(
  result: ContestUserResult,
): result is OIContestUserResult {
  return 'totalResource' in result;
}

export interface BaseContestUserResult<T extends ContestUserProblemResult> {
  user: User;

  contest: Contest;

  score: number;

  problemResults: T[];
}
