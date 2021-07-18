import * as React from 'react';
import { Message } from 'semantic-ui-react';

export const FormErrorMessage: React.FC<{ content?: React.ReactNode }> = ({
  content,
}) => {
  return <Message size={'tiny'} error content={content} />;
};
