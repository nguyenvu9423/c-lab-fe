import { SubmissionStatusType } from './SubmissionStatusType';
import { ProgressStatusType } from './ProgressStatusType';
import { TestResultStatusType } from './TestResultStatusType';

export const VerdictTypes = [
  { title: 'Any', filters: [] },
  {
    title: 'Accepted',
    filters: [
      {
        key: 'resultStatus',
        operator: ':',
        value: SubmissionStatusType.ACCEPTED
      }
    ]
  },
  {
    title: 'Compile error',
    filters: [
      {
        key: 'progressStatus',
        operator: ':',
        value: ProgressStatusType.COMPILE_ERROR
      }
    ]
  },
  {
    title: 'Wrong answer',
    filters: [
      {
        key: 'testError',
        operator: ':',
        value: TestResultStatusType.WA
      }
    ]
  },
  {
    title: 'Time limit exceeded',
    filters: [
      {
        key: 'testError',
        operator: ':',
        value: TestResultStatusType.TLE
      }
    ]
  },
  {
    title: 'Memory limit exceeded',
    filters: [
      {
        key: 'testError',
        operator: ':',
        value: TestResultStatusType.MLE
      }
    ]
  },
  {
    title: 'Runtime error',
    filters: [
      {
        key: 'testError',
        operator: ':',
        value: TestResultStatusType.RE
      }
    ]
  }
].map((item, id) => ({
  id,
  ...item
}));
