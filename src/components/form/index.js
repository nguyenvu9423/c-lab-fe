import * as React from 'react';
import { Message } from 'semantic-ui-react';
import * as Lodash from 'lodash';

export function useFormErrorMessage(touched, errors, status) {
  const ErrorMessage = ({ name }) => {
    if (Lodash.get(touched, name)) {
      const error = Lodash.get(errors, name);
      if (error) return <FormErrorMessage content={error} />;
      else if (status && status.errors[name]) {
        return <FormErrorMessage content={status.errors[name]} />;
      }
    }
    return null;
  };
  return ErrorMessage;
}

export function StatelessFormErrorMessage({ touched, error, statusError }) {
  if (touched) {
    if (error) return <FormErrorMessage content={error} />;
    else if (statusError) {
      return <FormErrorMessage content={statusError} />;
    }
  }
  return null;
}

export function FormErrorMessage({ content }) {
  return <Message size={'tiny'} error content={content} />;
}
