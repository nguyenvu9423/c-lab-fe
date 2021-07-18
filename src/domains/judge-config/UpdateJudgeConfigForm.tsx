import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblem } from '../../store/actions';
import { JudgeConfigForm } from './JudgeConfigForm';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components';
import { ProblemSelectors, JudgeConfigSelectors } from '../../store/selectors';
import { ProblemService } from '../../service/ProblemService';
import { State } from '../../store';
import { JudgeConfig } from './JudgeConfig';
import { Button } from 'semantic-ui-react';
import { ValidationException } from '../../exception';
import { FormikHelpers } from 'formik';

export namespace UpdateJudgeConfigForm {
  export type Props =
    | (BaseProps & { problemId: number })
    | (BaseProps & { problemCode: string });

  export interface BaseProps {
    problemId?: number;
    problemCode?: string;
    onSuccess?(value: any): void;
  }
}

export const UpdateJudgeConfigForm: React.FC<UpdateJudgeConfigForm.Props> = (
  props
) => {
  const { problemId, problemCode, onSuccess } = props;
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.updateJudgeConfigForm);

  const problem = useSelector(
    data.problem.loadingState === LoadingState.LOADED
      ? ProblemSelectors.byId(data.problem.id)
      : () => undefined
  );

  const judgeConfig: JudgeConfig | null | undefined = useSelector(
    problem
      ? problem.judgeConfig
        ? JudgeConfigSelectors.selectById(problem.judgeConfig)
        : () => null
      : () => undefined
  );

  const load = React.useCallback(() => {
    dispatch(
      problemId
        ? fetchProblem.request({
            type: 'byId',
            id: problemId,
            target: 'updateJudgeConfigForm',
          })
        : fetchProblem.request({
            type: 'byCode',
            code: problemCode!,
            target: 'updateJudgeConfigForm',
          })
    );
  }, [problemId, problemCode]);

  React.useEffect(() => {
    load();
  }, []);

  if (data.problem.loadingState === LoadingState.LOADING) {
    return <LoadingIndicator />;
  }

  return data.problem.loadingState === LoadingState.LOADED ? (
    judgeConfig ? (
      <EditJudgeConfigForm
        problemId={data.problem.id}
        judgeConfig={judgeConfig}
        onSuccess={onSuccess}
      />
    ) : (
      <AddJudgeConfigForm problemId={data.problem.id} onSuccess={onSuccess} />
    )
  ) : null;
};

function useSubmitJudgeConfig(props: {
  problemId: number;
  onSuccess?(value: any): void;
}) {
  const { problemId, onSuccess } = props;
  return React.useCallback(
    (
      values: JudgeConfigForm.Value,
      helpers: FormikHelpers<JudgeConfigForm.Value>
    ) => {
      const formData = new FormData();
      const { testPackage, customJudger, ...rest } = values;
      formData.append(
        'judgeConfig',
        new Blob([JSON.stringify(rest)], { type: 'application/json' })
      );
      if (testPackage && testPackage instanceof File) {
        formData.append('testPackage', testPackage);
      }

      if (customJudger && customJudger instanceof File) {
        formData.append('customJudger', customJudger);
      }

      return ProblemService.updateJudgeConfig(problemId, formData)
        .then(({ data }) => {
          onSuccess?.(data);
        })
        .catch((e) => {
          if (ValidationException.isInstance(e)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(e));
          }
        });
    },
    [problemId]
  );
}

const AddJudgeConfigForm: React.FC<{
  problemId: number;
  onSuccess?(value: any): void;
}> = (props) => {
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const handleSubmit = useSubmitJudgeConfig(props);
  if (isConfirmed) {
    return <JudgeConfigForm onSubmit={handleSubmit} />;
  } else {
    return (
      <Button
        icon="add"
        content="Add config"
        labelPosition="left"
        onClick={() => setIsConfirmed(true)}
      />
    );
  }
};

const EditJudgeConfigForm: React.FC<{
  problemId: number;
  judgeConfig: JudgeConfig;
  onSuccess?(value: any): void;
}> = (props) => {
  const { problemId, judgeConfig, onSuccess } = props;
  const handleSubmit = useSubmitJudgeConfig({ problemId, onSuccess });
  return (
    <JudgeConfigForm initialValues={judgeConfig} onSubmit={handleSubmit} />
  );
};
