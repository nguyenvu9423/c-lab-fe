import { createActions } from 'redux-actions';
import { defaultCreators } from './shared';

const { fetchJudgeConfig } = createActions({
  fetchJudgeConfig: {
    request: defaultCreators,
    response: defaultCreators
  }
});

export { fetchJudgeConfig };
