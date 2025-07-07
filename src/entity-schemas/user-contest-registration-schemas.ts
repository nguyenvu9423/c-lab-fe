import { schema } from 'normalizr';

export const userContestRegistrationSchema = new schema.Entity(
  'userContestRegistration',
  undefined,
  { idAttribute: (value) => `${value.user.id}-${value.contestId}` },
);

export const userContestRegistrationsSchema = new schema.Array(
  userContestRegistrationSchema,
);
