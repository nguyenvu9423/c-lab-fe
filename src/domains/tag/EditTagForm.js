import * as React from 'react';
import { TagForm } from './TagForm';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTag } from '../../store/actions';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components/loading-indicator';
import { TagSelectors } from '../../store/selectors/TagSelectors';
import { TagService } from '../../service/TagService';

export function EditTagForm(props) {
  const { tagId, onCancel, onSuccess } = props;
  const { data } = useSelector((state) => state.editTagForm);
  const dispath = useDispatch();
  React.useEffect(() => {
    if (data.tag.loadingState === LoadingState.LOAD_NEEDED) {
      dispath(
        fetchTag.request({ id: tagId }, { target: Target.EDIT_TAG_FORM })
      );
    }
  }, [tagId]);

  const tag = useSelector(TagSelectors.byId(tagId));

  if (!LoadingState.isInProgress(data.loadingState)) {
    return <LoadingIndicator />;
  }

  const handleSubmit = React.useCallback(
    (values) => {
      TagService.updateTag(tagId, values)
        .then(() => {
          onSuccess?.();
        })
        .catch((e) => console.log(e));
    },
    [tagId, onSuccess]
  );

  return (
    <TagForm onCancel={onCancel} onSubmit={handleSubmit} initialValues={tag} />
  );
}
