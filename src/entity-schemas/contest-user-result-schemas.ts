import { schema } from 'normalizr';

export const contestUserResultSchema = new schema.Entity(
  'contestUserResult',
  undefined,
  { idAttribute: (value) => `${value.contest.id}-${value.user.id}` },
);

export const contestUserResultsSchema = new schema.Array(
  contestUserResultSchema,
);
