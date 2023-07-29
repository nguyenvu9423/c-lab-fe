import * as React from 'react';
import { normalize } from 'normalizr';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';

import { submissionSchema } from '@/entity-schemas';
import { JudgeService } from '@/services/judge';
import { SubmissionService } from '@/services/submission';
import { updateEntity } from '@/store/actions';
import { JudgeSelectors } from '@/store/selectors';
import { InProgressJudge } from '@/domains/judge';
import { Submission } from '@/domains/submission';

export const RejudgeSubButton: React.FC<{ submission: Submission }> = (
  props,
) => {
  const { submission } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const judge = useSelector(JudgeSelectors.byId(submission.judge));

  const isJudging = judge && InProgressJudge.isInstance(judge);

  const rejudge = React.useCallback(() => {
    setLoading(true);
    SubmissionService.rejudge(submission.id)
      .then(({ data }) => {
        const { entities } = normalize(data, submissionSchema);
        dispatch(updateEntity({ entities }));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch, submission]);

  const cancelJudge = React.useCallback(() => {
    if (judge?.id) {
      setLoading(true);
      JudgeService.cancel(judge.id)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [judge?.id]);

  return !isJudging ? (
    <Popup
      content="Chấm lại"
      trigger={
        <Button
          icon="redo"
          disabled={submission.disqualified || loading}
          onClick={rejudge}
        />
      }
    />
  ) : (
    <Popup
      content="Stop"
      trigger={
        <Button icon="stop" negative disabled={loading} onClick={cancelJudge} />
      }
    />
  );
};
