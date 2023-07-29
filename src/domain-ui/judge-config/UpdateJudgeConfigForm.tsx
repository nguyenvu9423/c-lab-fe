import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDetailedProblem,
  resetState,
  updateEntity,
} from '../../store/actions';
import { JudgeConfigForm } from './JudgeConfigForm';
import { LoadingIndicator, useFormKey } from '@/components';
import {
  ProblemSelectors,
  AuthorizationSelectors,
  ConstSelectors,
  DetailedJudgeConfigSelectors,
} from '@/store/selectors';
import { ProblemService } from '../../services/ProblemService';
import { State } from '../../store';
import { Button } from 'semantic-ui-react';
import { ValidationException } from '../../shared/exceptions';
import { FormikHelpers } from 'formik';
import { detailedProblemSchema } from '@/entity-schemas';
import { normalize } from 'normalizr';
import { Target } from '../../store/reducers/target';
import { DataHolder } from '../../store/reducers/data-holders/shared';
import { DetailedJudgeConfig } from '@/domains/judge-config';

export namespace UpdateJudgeConfigForm {
  export interface Props {
    problemCode: string;
    onSuccess?(value: any): void;
  }
}

export const UpdateJudgeConfigForm: React.FC<UpdateJudgeConfigForm.Props> = (
  props,
) => {
  const { problemCode, onSuccess } = props;
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.updateJudgeConfigForm);

  const problem = useSelector(
    DataHolder.isLoaded(data.detailedProblem)
      ? ProblemSelectors.byId(data.detailedProblem.id)
      : ConstSelectors.value(undefined),
  );

  const detailedJudgeConfig: DetailedJudgeConfig | null | undefined =
    useSelector(
      problem
        ? problem.judgeConfig
          ? DetailedJudgeConfigSelectors.selectById(problem.judgeConfig)
          : ConstSelectors.value(null)
        : ConstSelectors.value(undefined),
    );

  const load = React.useCallback(() => {
    dispatch(
      fetchDetailedProblem.request({
        type: 'byCode',
        code: problemCode,
        target: Target.UPDATE_JUDGE_CONFIG_FORM,
      }),
    );
  }, [dispatch, problemCode]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.UPDATE_JUDGE_CONFIG_FORM }));
    };
  }, [dispatch, load]);

  const canUpdate = useSelector(
    problem
      ? AuthorizationSelectors.canUpdateProblem(problem)
      : () => undefined,
  );

  if (!canUpdate) {
    return <p>Bạn không có quyền truy cập vào trang này</p>;
  }

  if (DataHolder.isLoading(data.detailedProblem)) {
    return <LoadingIndicator />;
  }

  return DataHolder.isLoaded(data.detailedProblem) ? (
    detailedJudgeConfig ? (
      <EditJudgeConfigForm
        problemCode={problemCode}
        judgeConfig={detailedJudgeConfig}
        onSuccess={onSuccess}
      />
    ) : (
      <AddJudgeConfigForm problemCode={problemCode} onSuccess={onSuccess} />
    )
  ) : null;
};

function useSubmitJudgeConfig(props: {
  problemCode: string;
  onSuccess?(value: any): void;
}) {
  const { problemCode, onSuccess } = props;
  return React.useCallback(
    (
      values: JudgeConfigForm.Value,
      helpers: FormikHelpers<JudgeConfigForm.Value>,
    ) => {
      const formData = new FormData();
      const { testPackage, customJudger, ...rest } = values;
      formData.append(
        'judgeConfig',
        new Blob([JSON.stringify(rest)], { type: 'application/json' }),
      );
      if (testPackage && testPackage instanceof File) {
        formData.append('testPackage', testPackage);
      }

      if (customJudger && customJudger instanceof File) {
        formData.append('customJudger', customJudger);
      }

      return ProblemService.updateJudgeConfig(problemCode, formData)
        .then(({ data }) => {
          onSuccess?.(data);
        })
        .catch((e) => {
          if (ValidationException.isInstance(e)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(e));
          }
        });
    },
    [problemCode],
  );
}

const AddJudgeConfigForm: React.FC<{
  problemCode: string;
  onSuccess?(value: any): void;
}> = (props) => {
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [key, updateKey] = useFormKey();
  const dispatch = useDispatch();

  const handleSubmit = useSubmitJudgeConfig({
    problemCode: props.problemCode,
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
        content="Thêm cài đặt"
        labelPosition="left"
        onClick={() => setIsConfirmed(true)}
      />
    );
  }
};

const EditJudgeConfigForm: React.FC<{
  problemCode: string;
  judgeConfig: DetailedJudgeConfig;
  onSuccess?(value: any): void;
}> = (props) => {
  const { problemCode, judgeConfig, onSuccess } = props;
  const [key, updateKey] = useFormKey();
  const dispatch = useDispatch();

  const handleSubmit = useSubmitJudgeConfig({
    problemCode,
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
