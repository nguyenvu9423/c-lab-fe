import * as React from 'react';
import { ProblemService } from '../../../service/ProblemService';
import { LoadingIndicator } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProblem } from '../../../store/actions';
import { LoadingState } from '../../../store/common';
import { Target } from '../../../store/reducers/target';
import { State } from '../../../store';
import { ProblemForm } from './ProblemForm';
import { ProblemSelectors } from '../../../store/selectors';
import { TagSelectors } from '../../../store/selectors/TagSelectors';

export namespace EditProblemForm {
  export type Props = ByIdProps | ByCodeProps;

  export interface BaseProps {
    problemId?: number;
    problemCode?: string;
    onCancel?(): void;
    onSuccess?(value: any): void;
  }

  export interface ByIdProps extends BaseProps {
    problemId: number;
  }

  export interface ByCodeProps extends BaseProps {
    problemCode: string;
  }
}

export const EditProblemForm: React.FC<EditProblemForm.Props> = (props) => {
  const dispatch = useDispatch();
  const { problemId, problemCode, onCancel, onSuccess } = props;

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

  React.useEffect(() => {
    dispatch(
      problemId
        ? fetchProblem.request({
            type: 'byId',
            id: problemId,
            target: Target.EDIT_PROBLEM_FORM,
          })
        : fetchProblem.request({
            type: 'byCode',
            code: problemCode!,
          })
    );
  }, [problemId, problemCode]);

  const handleSubmit = React.useCallback(
    (values) => {
      return ProblemService.updateProblem(problem?.id, values).then(
        ({ data }) => {
          onSuccess?.(data);
        }
      );
    },
    [problem?.id]
  );

  if (LoadingState.isInProgress(data.problem.loadingState)) {
    return <LoadingIndicator />;
  }

  return data.problem.loadingState === LoadingState.LOADED && problem ? (
    <ProblemForm
      initialValues={initialValues}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  ) : null;
};
