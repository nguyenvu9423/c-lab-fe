import { detailedProblemEntityReducer } from './detailedProblemEntityAdapter';
import { judgeConfigEntityReducer } from './judgeConfigEntityAdapter';
import { articleEntityReducer } from './articleEntityAdapter';
import { tagEntityReducer } from './tagEntityAdapter';
import { roleEntityReducer } from './roleEntityAdapter';
import { userEntityReducer } from './userEntityAdapter';
import { problemRejudgeEntityReducer } from './problemRejudgeAdapter';
import { judgeEntityReducer } from './judgeEntityAdapter';
import { detailedSubEntityReducer } from './detailedSubEntityAdapter';
import { detailedJudgeEntityReducer } from './detailedJudgeAdapter';
import { submissionEntityReducer } from './submissionEntityAdapter';
import { problemEntityReducer } from './problemEntityAdapter';
import { combineReducers } from 'redux';
import { detailedJudgeConfigEntityReducer } from './detailedJudgeConfigEntityAdapter';
import { contestEntityReducer } from './contestEntityAdapter';
import { userProblemResultEntityReducer } from './userProblemEntityAdapter';
import { contestSubmissionEntityReducer } from './contestSubmissionEntityAdapter';
import { contestUserResultEntityReducer } from './contestUserResultEntityAdapter';
import { userContestRegistrationEntityReducer } from './userContestRegistrationEntityAdapter';
import { contestProblemRejudgeEntityReducer } from './contestProblemRejudgeEntityAdapter';

export const entityReducer = combineReducers({
  user: userEntityReducer,
  role: roleEntityReducer,
  article: articleEntityReducer,
  problem: problemEntityReducer,
  contest: contestEntityReducer,
  contestSubmission: contestSubmissionEntityReducer,
  contestUserResult: contestUserResultEntityReducer,
  contestProblemRejudge: contestProblemRejudgeEntityReducer,
  detailedProblem: detailedProblemEntityReducer,
  problemRejudge: problemRejudgeEntityReducer,
  submission: submissionEntityReducer,
  detailedSub: detailedSubEntityReducer,
  judge: judgeEntityReducer,
  detailedJudge: detailedJudgeEntityReducer,
  judgeConfig: judgeConfigEntityReducer,
  detailedJudgeConfig: detailedJudgeConfigEntityReducer,
  tag: tagEntityReducer,
  userProblemResult: userProblemResultEntityReducer,
  userContestRegistration: userContestRegistrationEntityReducer,
});
