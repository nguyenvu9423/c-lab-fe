import * as React from 'react';
import * as Lodash from 'lodash';
import { FormErrorMessage } from './FormErrorMessage';
import { FormikTouched, FormikErrors } from 'formik';
import { FieldError } from '../../shared/exceptions';

export function useErrorMessageRenderer<T>(params: {
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  status?: { errors?: FieldError[] };
}): (name: keyof T) => React.ReactNode {
  const { touched, errors, status } = params;
  const renderer = React.useCallback(
    (name) => {
      if (Lodash.get(touched, name)) {
        const error = Lodash.get(errors, name);
        if (error) {
          return <FormErrorMessage content={error.toString()} />;
        }
      } else {
        if (status?.errors) {
          const fieldError = status.errors.find((err) => err.field === name);
          if (fieldError) {
            return <FormErrorMessage content={fieldError.message} />;
          }
        }
      }
      return null;
    },
    [touched, errors, status],
  );

  return renderer;
}
