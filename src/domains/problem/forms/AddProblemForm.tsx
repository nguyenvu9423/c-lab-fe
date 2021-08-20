import * as React from 'react';
import { ProblemService } from '../../../service/ProblemService';
import { ValidationException, FieldError } from '../../../exception';
import { ProblemForm } from './ProblemForm';
import { FormikHelpers } from 'formik';
import { SubmissionLanguage } from '../../submission-lang/SubmissionLanguage';
import { useFormKey } from '../../../components';
import { useDispatch } from 'react-redux';

export namespace AddProblemForm {
  export interface Props {
    onSuccess?: (data: any) => void;
    onCancel?: () => void;
  }
}

const initialValues: Partial<ProblemForm.Value> = {
  allowedLanguages: SubmissionLanguage.values,
};

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
    []
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
