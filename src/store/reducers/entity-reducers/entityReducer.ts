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

export const entityReducer = combineReducers({
  user: userEntityReducer,
  role: roleEntityReducer,
  article: articleEntityReducer,
  problem: problemEntityReducer,
  detailedProblem: detailedProblemEntityReducer,
  problemRejudge: problemRejudgeEntityReducer,
  submission: submissionEntityReducer,
  detailedSub: detailedSubEntityReducer,
  judge: judgeEntityReducer,
  judgeConfig: judgeConfigEntityReducer,
  detailedJudge: detailedJudgeEntityReducer,
  tag: tagEntityReducer,
});
