import { normalize } from 'normalizr';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import { submissionSchema } from '../../../../entity-schemas';
import { SubmissionService } from '../../../../services/SubmissionService';
import { updateEntity } from '../../../../store/actions';
import { Submission } from '../../Submission';

export const QualifySubButton: React.FC<{ submission: Submission }> = (
  props
) => {
  const { submission } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  const setDisqualified = React.useCallback(
    (id: number, disqualified: boolean) => {
      setLoading(true);
      SubmissionService.updateDisqualified(id, disqualified)
        .then(({ data }) => {
          const { entities } = normalize(data, submissionSchema);
          dispatch(updateEntity({ entities }));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [dispatch]
  );
  return submission.disqualified ? (
    <Popup
      content="Công nhận"
      trigger={
        <Button
          icon="add circle"
          positive
          disabled={loading}
          onClick={() => setDisqualified(submission.id, false)}
        />
      }
    />
  ) : (
    <Popup
      content="Không công nhận"
      trigger={
        <Button
          icon="ban"
          negative
          disabled={loading}
          onClick={() => setDisqualified(submission.id, true)}
        />
      }
    />
  );
};
