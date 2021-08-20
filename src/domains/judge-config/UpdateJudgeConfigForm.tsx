import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDetailedProblem,
  resetState,
  updateEntity,
} from '../../store/actions';
import { JudgeConfigForm } from './JudgeConfigForm';
import { LoadingState } from '../../store/common';
import { LoadingIndicator, useFormKey } from '../../components';
import {
  ProblemSelectors,
  JudgeConfigSelectors,
  AuthorizationSelectors,
} from '../../store/selectors';
import { ProblemService } from '../../service/ProblemService';
import { State } from '../../store';
import { JudgeConfig } from './JudgeConfig';
import { Button } from 'semantic-ui-react';
import { ValidationException } from '../../exception';
import { FormikHelpers } from 'formik';
import { detailedProblemSchema } from '../problem';
import { normalize } from 'normalizr';
import { Target } from '../../store/reducers/target';

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
    data.detailedProblem.loadingState === LoadingState.LOADED
      ? ProblemSelectors.byId(data.detailedProblem.id)
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
        ? fetchDetailedProblem.request({
            type: 'byId',
            id: problemId,
            target: Target.UPDATE_JUDGE_CONFIG_FORM,
          })
        : fetchDetailedProblem.request({
            type: 'byCode',
            code: problemCode!,
            target: Target.UPDATE_JUDGE_CONFIG_FORM,
          })
    );
  }, [dispatch, problemId, problemCode]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.UPDATE_JUDGE_CONFIG_FORM }));
    };
  }, [dispatch, load]);

  const canUpdate = useSelector(
    problem ? AuthorizationSelectors.canUpdateProblem(problem) : () => undefined
  );

  if (!canUpdate) {
    return <p>You do not have the permission to update the judge config</p>;
  }

  if (data.detailedProblem.loadingState === LoadingState.LOADING) {
    return <LoadingIndicator />;
  }

  return data.detailedProblem.loadingState === LoadingState.LOADED ? (
    judgeConfig ? (
      <EditJudgeConfigForm
        problemId={data.detailedProblem.id}
        judgeConfig={judgeConfig}
        onSuccess={onSuccess}
      />
    ) : (
      <AddJudgeConfigForm
        problemId={data.detailedProblem.id}
        onSuccess={onSuccess}
      />
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
  const [key, updateKey] = useFormKey();
  const dispatch = useDispatch();

  const handleSubmit = useSubmitJudgeConfig({
    problemId: props.problemId,
    onSuccess: (data) => {
      const normalizedData = normalize(data, detailedProblemSchema);
      dispatch(updateEntity({ entities: normalizedData.entities }));
      updateKey();
      props.onSuccess?.(data);
    },
  });
  if (isConfirmed) {
    return <JudgeConfigForm key={key} onSubmit={handleSubmit} />;
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
  const [key, updateKey] = useFormKey();
  const dispatch = useDispatch();

  const handleSubmit = useSubmitJudgeConfig({
    problemId,
    onSuccess: (data) => {
      const normalizedData = normalize(data, detailedProblemSchema);
      dispatch(updateEntity({ entities: normalizedData.entities }));
      updateKey();
      onSuccess?.(data);
    },
  });
  return (
    <JudgeConfigForm
      key={key}
      initialValues={judgeConfig}
      onSubmit={handleSubmit}
    />
  );
};
