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
      testPackage: { ...state.testPackage, ...payload.testPackage },
      submission: { ...state.submission, ...payload.submission },
      submissionDetails: {
        ...state.submissionDetails,
        ...payload.submissionDetails
      }
    };
  },
  {
    user: {},
    article: {},
    problem: {},
    codeLanguage: {},
    testPackage: {},
    submission: {},
    submissionDetails: {}
  }
);
export { entityReducer };
