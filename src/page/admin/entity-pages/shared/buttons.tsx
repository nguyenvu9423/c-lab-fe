import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';

export const AddButton: React.FC<ButtonProps> = (props) => {
  return <Button icon="add" primary {...props} />;
};

export const EditRowButton: React.FC<ButtonProps> = (props) => {
  return <Button icon="edit" size="tiny" {...props} />;
};

export const DeleteRowButton: React.FC<ButtonProps> = (props) => {
  return <Button icon="delete" size="tiny" negative primary {...props} />;
};
