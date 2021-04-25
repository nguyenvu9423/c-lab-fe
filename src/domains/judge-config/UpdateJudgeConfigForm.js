import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblem } from '../../store/actions';
import { JudgeConfigForm } from './JudgeConfigForm';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components';
import { ProblemSelectors } from '../../store/selectors';
import { ProblemService } from '../../service/ProblemService';

export function UpdateJudgeConfigForm(props) {
  const { problemId, onSuccess } = props;
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.updateJudgeConfigForm);

  const problem = useSelector(ProblemSelectors.byId(data.problem.id));

  const load = React.useCallback(() => {
    dispatch(
      fetchProblem.request(
        { id: problemId },
        { target: 'updateJudgeConfigForm' }
      )
    );
  }, [problemId]);

  React.useEffect(() => {
    load();
  }, []);

  const handleSubmit = React.useCallback(values => {
    const formData = new FormData();
    const { testPackageFile, customJudgerFile, ...rest } = values;
    formData.append(
      'judgeConfig',
      new Blob([JSON.stringify(rest)], { type: 'application/json' })
    );

    formData.append('testPackageFile', testPackageFile);

    if (customJudgerFile) {
      formData.append('customJudgerFile', customJudgerFile);
    }

    return ProblemService.updateJudgeConfig(problemId, formData).then(() => {
      onSuccess?.();
    });
  }, []);

  if (LoadingState.isInProgress(data.problem.loadingState)) {
    return <LoadingIndicator />;
  }

  return (
    <JudgeConfigForm
      initialValues={problem.judgeConfig}
      onSubmit={handleSubmit}
    />
  );
}
