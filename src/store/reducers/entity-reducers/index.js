import { handleAction } from 'redux-actions';
import { updateEntity } from '../../actions/entity';

const entityReducer = handleAction(
  updateEntity,
  (state, action) => {
    const { payload } = action;
    return {
      user: { ...state.user, ...payload.user },
      article: { ...state.article, ...payload.article },
      problem: { ...state.problem, ...payload.problem },
      codeLanguage: { ...state.codeLanguage, ...payload.codeLanguage },
      judgeConfig: { ...state.judgeConfig, ...payload.judgeConfig },
      submission: { ...state.submission, ...payload.submission },
      submissionDetails: {
        ...state.submissionDetails,
        ...payload.submissionDetails
      },
      tag: { ...state.tag, ...payload.tag }
    };
  },
  {
    user: {},
    article: {},
    problem: {},
    codeLanguage: {},
    judgeConfig: {},
    submission: {},
    submissionDetails: {}
  }
);
export { entityReducer };
