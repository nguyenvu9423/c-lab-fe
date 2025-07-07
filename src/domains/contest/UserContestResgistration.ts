import { UserIdentity } from '../user';

export interface UserContestRegistration {
  contestId: number;

  user: UserIdentity;

  registered: boolean;
}
