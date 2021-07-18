import * as React from 'react';
import { TagForm } from './TagForm';
import { TagService } from '../../service/TagService';
import { FieldError, ValidationException } from '../../exception';

export namespace AddTagForm {
  export interface Props {
    onCancel: () => void;
    onSuccess: (tag: any) => void;
  }
}

export const AddTagForm: React.FC<AddTagForm.Props> = (props) => {
  const { onCancel, onSuccess } = props;
  const [errors, setErrors] = React.useState<FieldError[] | undefined>();

  const handleSubmit = React.useCallback((values) => {
    return TagService.createTag(values)
      .then(({ data }) => {
        onSuccess?.(data);
      })
      .catch((error) => {
        if (ValidationException.isInstance(error)) {
          setErrors(error.errors);
        }
      });
  }, []);

  return (
    <TagForm onCancel={onCancel} onSubmit={handleSubmit} status={{ errors }} />
  );
};
