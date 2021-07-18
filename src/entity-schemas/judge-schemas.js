import { schema } from 'normalizr';

export const judgeSchema = new schema.Entity('judge');

export const detailedJudgeSchema = new schema.Entity('detailedJudge');

export const judgesSchema = new schema.Array(judgeSchema);
