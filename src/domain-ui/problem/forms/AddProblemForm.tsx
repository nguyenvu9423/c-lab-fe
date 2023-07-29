import * as React from 'react';
import { ProblemService } from '@/services/ProblemService';
import { ValidationException } from '../../../shared/exceptions';
import { ProblemForm } from './ProblemForm';
import { FormikHelpers } from 'formik';

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
    [],
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
