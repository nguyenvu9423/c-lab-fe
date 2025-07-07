import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikHelpers } from 'formik';
import moment from 'moment';

import { State } from '@/store/state';
import { LoadingState } from '@/store/common';
import { AuthorizationSelectors, ContestSelectors } from '@/store/selectors';
import { fetchContest, resetState } from '@/store/actions';
import { Target } from '@/store/reducers/target';
import { ContestService } from '@/services';
import { UpdateContestRequestDto } from '@/services/dtos/contest';
import { ValidationException } from '@/shared/exceptions';
import { ContestForm } from './ContestForm';

export namespace EditContestForm {
  export interface Props {
    contestId: number;
    onSuccess?: () => void;
  }
}

export const EditContestForm: React.FC<EditContestForm.Props> = (props) => {
  const dispatch = useDispatch();
  const { contestId, onSuccess } = props;

  const { data } = useSelector((state: State) => state.editContestForm);
  const contest = useSelector(
    data.contest.loadingState === LoadingState.LOADED
      ? ContestSelectors.byId(data.contest.id)
      : () => undefined,
  );

  React.useEffect(() => {
    dispatch(
      fetchContest.request({
        type: 'byId',
        id: contestId,
        target: Target.EDIT_CONTEST_FORM,
      }),
    );
    return () => {
      dispatch(resetState({ target: Target.EDIT_CONTEST_FORM }));
    };
  }, [dispatch, contestId]);

  const handleSubmit = React.useCallback(
    (value: ContestForm.Value, helpers: FormikHelpers<unknown>) => {
      const dto: UpdateContestRequestDto = {
        ...value,
        start: value.start.toISOString(),
        end: moment(value.start).add(value.duration, 'minutes').toISOString(),
      };
      return ContestService.update(contestId, dto)
        .then(() => onSuccess?.())
        .catch((error) => {
          if (ValidationException.isInstance(error)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(error));
          }
        });
    },
    [contestId, onSuccess],
  );

  const canEdit = useSelector(
    contest
      ? AuthorizationSelectors.canUpdateContest(contest)
      : () => undefined,
  );

  if (!canEdit) {
    return <p>Bạn không có quyền chỉnh sửa kỳ thi này</p>;
  }

  return data.contest.loadingState === LoadingState.LOADED && contest ? (
    <ContestForm
      initialValue={{
        ...contest,
        start: new Date(contest.start),
        duration: moment
          .duration(moment(contest.end).diff(moment(contest.start)))
          .asMinutes(),
      }}
      onSubmit={handleSubmit}
    />
  ) : null;
};
