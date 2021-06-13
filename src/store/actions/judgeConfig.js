import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';

const fetchJudgeConfig = {
  request: createAction('fetchJudgeConfig/request', defaultPrepare),
  response: createAction('fetchJudgeConfig/response', defaultPrepare),
};

export { fetchJudgeConfig };
