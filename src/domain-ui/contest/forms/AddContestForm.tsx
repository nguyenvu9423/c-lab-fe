import React from 'react';
import { FormikHelpers } from 'formik';
import moment from 'moment';
import { Contest } from '@/domains/contest';
import { ContestService } from '@/services';
import { ContestCreationRequestDto } from '@/services/dtos';
import { ValidationException } from '@/shared/exceptions';
import { ContestForm } from './ContestForm';

export namespace AddContestForm {
  export interface Props {
    onSuccess?: (data: Contest) => void;
  }
}

export const AddContestForm: React.FC<AddContestForm.Props> = (props) => {
  const { onSuccess } = props;

  const onSubmitHandler = React.useCallback(
    (values: ContestForm.Value, helpers: FormikHelpers<ContestForm.Value>) => {
      const { name, description, start, duration } = values;
      const dto: ContestCreationRequestDto = {
        name,
        description,
        start: start.toISOString(),
        end: moment(start).add(duration, 'minute').toISOString(),
      };
      return ContestService.create(dto)
        .then(({ data }) => {
          onSuccess?.(data);
        })
        .catch((err) => {
          if (ValidationException.isInstance(err)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(err));
          }
        });
    },
    [onSuccess],
  );

  return <ContestForm onSubmit={onSubmitHandler} />;
};
