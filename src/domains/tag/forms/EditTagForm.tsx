import * as React from 'react';
import { TagForm } from '../TagForm';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTag } from '../../../store/actions';
import { Target } from '../../../store/reducers/target';
import { LoadingState } from '../../../store/common';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { TagSelectors } from '../../../store/selectors/TagSelectors';
import { TagService } from '../../../service/TagService';
import { State } from '../../../store';

export const EditTagForm: React.FC<{
  tagId: number;
  onCancel?: () => void;
  onSuccess?: () => void;
}> = (props) => {
  const { tagId, onCancel, onSuccess } = props;
  const { data } = useSelector((state: State) => state.editTagForm);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTag.request({ id: tagId, target: Target.EDIT_TAG_FORM }));
  }, [dispatch, tagId]);

  const tag = useSelector(
    data.tag.loadingState === 'LOADED'
      ? TagSelectors.selectById(tagId)
      : () => undefined
  );

  const handleSubmit = React.useCallback(
    (values) => {
      return TagService.updateTag(tagId, values)
        .then(() => {
          onSuccess?.();
        })
        .catch((e) => console.log(e));
    },
    [tagId, onSuccess]
  );

  if (LoadingState.isInProgress(data.tag.loadingState)) {
    return <LoadingIndicator />;
  }

  return (
    <TagForm onCancel={onCancel} onSubmit={handleSubmit} initialValues={tag} />
  );
};
