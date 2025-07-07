import * as React from 'react';
import { FormikHelpers } from 'formik';
import { ProblemService } from '@/services/ProblemService';
import { ValidationException } from '../../../shared/exceptions';
import { ProblemForm } from './ProblemForm';

export namespace AddProblemForm {
  export interface Props {
    onSuccess?: (data: any) => void;
    onCancel?: () => void;
  }
}

const initialValues: Partial<ProblemForm.Value> = {};

export const AddProblemForm: React.FC<AddProblemForm.Props> = (props) => {
  const { onSuccess, onCancel } = props;

  const onSubmitHandler = React.useCallback(
    (values, helpers: FormikHelpers<ProblemForm.Value>) => {
      return ProblemService.create(values)
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

  return (
    <ProblemForm
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      onCancel={onCancel}
      isCodeEditable={true}
    />
  );
};
