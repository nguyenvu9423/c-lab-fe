import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';

export const CancelButton: React.FC<ButtonProps> = (props) => {
  return <Button type="button" icon="cancel" content="Cancel" {...props} />;
};
