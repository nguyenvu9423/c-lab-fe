import { handleAction } from 'redux-actions';
import { updateEntity } from '../../actions/entity';

const entityReducer = handleAction(
  updateEntity,
  (state, action) => {
    const { payload } = action;
    return {
      user: { ...state.user, ...payload.user },
      role: { ...state.role, ...payload.role },

      article: { ...state.article, ...payload.article },
      problem: { ...state.problem, ...payload.problem },

      submission: { ...state.submission, ...payload.submission },
      submissionDetails: {
        ...state.submissionDetails,
        ...payload.submissionDetails
      },

      judge: { ...state.judge, ...payload.judge },
      judgeConfig: { ...state.judgeConfig, ...payload.judgeConfig },
      problemRejudge: { ...state.problemRejudge, ...payload.problemRejudge },

      codeLanguage: { ...state.codeLanguage, ...payload.codeLanguage },
      tag: { ...state.tag, ...payload.tag }
    };
  },
  {
    user: {},
    article: {},
    problem: {},
    problemRejudge: {},
    codeLanguage: {},
    judgeConfig: {},
    submission: {},
    submissionDetails: {},
    role: {}
  }
);
export { entityReducer };
