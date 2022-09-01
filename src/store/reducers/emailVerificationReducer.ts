import { DataHolderState } from './data-holders/shared';

export type EmailVerificationState = DataHolderState<
  Record<string, unknown>,
  { user: { id: number }; hasRefreshedToken?: boolean }
>;
