import * as React from 'react';
import * as Lodash from 'lodash';
import { Message } from 'semantic-ui-react';

export function useErrorMessageRenderer({ touched, errors, status }) {
  const renderer = React.useCallback(
    name => {
      if (Lodash.get(touched, name)) {
        const error = Lodash.get(errors, name);
        if (error) {
          return <FormErrorMessage content={error} />;
        } else if (status && status.errors[name]) {
          return <FormErrorMessage content={status.errors[name]} />;
        }
      }
      return null;
    },
    [touched, errors, status]
  );

  return renderer;
}

export function FormErrorMessage({ content }) {
  return <Message size={'tiny'} error content={content} />;
}
