import * as React from 'react';
import { normalize } from 'normalizr';
import { useSelector, useDispatch } from 'react-redux';

import { ProblemService } from '@/services/ProblemService';
import { LoadingIndicator, useFormKey } from '../../../components';
import { fetchProblem, resetState, updateEntity } from '@/store/actions';
import { LoadingState } from '@/store/common';
import { Target } from '@/store/reducers/target';
import { State } from '../../../store';
import { ProblemForm } from './ProblemForm';
import { AuthorizationSelectors, ProblemSelectors } from '@/store/selectors';
import { TagSelectors } from '@/store/selectors/TagSelectors';
import { problemSchema } from '../../../entity-schemas/problem-schemas';
import { ValidationException } from '../../../shared/exceptions';
import { FormikHelpers } from 'formik';

export namespace EditProblemForm {
  export interface Props {
    problemCode: string;
    onCancel?(): void;
    onSuccess?(value: any): void;
  }
}

export const EditProblemForm: React.FC<EditProblemForm.Props> = (props) => {
  const dispatch = useDispatch();
  const { problemCode, onCancel, onSuccess } = props;

  const { data } = useSelector((state: State) => state.editProblemForm);
  const problem = useSelector(
    data.problem.loadingState === LoadingState.LOADED
      ? ProblemSelectors.byId(data.problem.id)
      : () => undefined
  );

  const tags = useSelector(
    problem ? TagSelectors.selectTagsByIds(problem.tags) : () => undefined
  );

  const initialValues: ProblemForm.Value | undefined =
    problem && tags ? { ...problem, tags } : undefined;

  const [key, updateKey] = useFormKey();

  React.useEffect(() => {
    dispatch(
      fetchProblem.request({
        type: 'byCode',
        code: problemCode,
        target: Target.EDIT_PROBLEM_FORM,
      })
    );
    return () => {
      dispatch(resetState({ target: Target.EDIT_PROBLEM_FORM }));
    };
  }, [dispatch, problemCode]);

  const handleSubmit = React.useCallback(
    (values: ProblemForm.Value, helpers: FormikHelpers<ProblemForm.Value>) => {
      return ProblemService.updateProblem(problemCode, values)
        .then((response) => {
          const normalizedData = normalize(response.data, problemSchema);
          dispatch(updateEntity({ entities: normalizedData.entities }));
          updateKey();
          onSuccess?.(response.data);
        })
        .catch((e) => {
          if (ValidationException.isInstance(e)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(e));
          }
        });
    },
    [problemCode]
  );

  const canEdit = useSelector(
    problem ? AuthorizationSelectors.canUpdateProblem(problem) : () => undefined
  );

  if (canEdit === false) {
    return <p>Bạn không có quyền chỉnh sửa bài tập này</p>;
  }

  if (LoadingState.isInProgress(data.problem.loadingState)) {
    return <LoadingIndicator />;
  }

  return data.problem.loadingState === LoadingState.LOADED && problem ? (
    <ProblemForm
      key={key}
      initialValues={initialValues}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  ) : null;
};
