import { createActions } from 'redux-actions';
import { defaultCreators } from './shared';

const { fetchJudgeConfigs } = createActions({
  fetchJudgeConfigs: {
    request: defaultCreators,
    response: defaultCreators
  }
});

export { fetchJudgeConfigs };
