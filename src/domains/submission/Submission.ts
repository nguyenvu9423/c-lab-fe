import { ProblemDTO } from '../problem/ProblemDTO';
import { UserDTO } from '../user';

export interface Submission {
  id: number;

  problem: ProblemDTO;

  user: UserDTO;

  judge: number;

  language: string;

  disqualified: boolean;
}

export interface DetailedSub extends Submission {
  code: string;
}
