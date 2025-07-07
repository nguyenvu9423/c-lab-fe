import { Contest } from '@/domains/contest';

export interface BaseContestContentProps {
  contest: Contest;

  nav?: React.ReactNode;
}
