import { FormikErrors } from 'formik';
import { RequestException } from './BaseResponseException';

export interface ValidationException extends RequestException {
  type: 'MethodArgumentNotValid';

  errors: FieldError[];
}

export interface FieldError {
  field: string;

  message: string;
}

export namespace ValidationException {
  export function isInstance(
    exception: unknown
  ): exception is ValidationException {
    if (
      exception instanceof Object &&
      exception['type'] === 'ValidationException'
    ) {
      return true;
    }
    return false;
  }

  export function convertToFormikErrors(
    exception: ValidationException
  ): FormikErrors<Record<string, unknown>> {
    const result = {};
    exception.errors.forEach((fieldError) => {
      result[fieldError.field] = fieldError.message;
    });
    return result;
  }
}
