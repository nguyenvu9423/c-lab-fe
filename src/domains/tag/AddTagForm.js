import * as React from 'react';
import { TagForm } from './TagForm';
import { TagService } from '../../service/TagService';

export function AddTagForm(props) {
  const { onCancel, onSuccess } = props;
  const handleSubmit = React.useCallback((values) => {
    TagService.createTag(values).then((response) => {
      onSuccess?.(response);
    });
  });
  return <TagForm onCancel={onCancel} onSubmit={handleSubmit} />;
}
