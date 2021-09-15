import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';

export const SubmitButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button type="submit" icon="check" content="Submit" primary {...props} />
  );
};
