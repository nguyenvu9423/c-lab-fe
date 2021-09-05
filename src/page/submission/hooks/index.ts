import * as React from 'react';
import { normalize } from 'normalizr';
import { submissionsSchema } from '../../../entity-schemas';
import { SubmissionService } from '../../../service/SubmissionService';
import ArrayUtils from '../../../utility/ArrayUtils';
import { updateEntity } from '../../../store/actions/entity';
import { useDispatch } from 'react-redux';
import { Submission } from '../../../domains/submission';

function useSubmissionStream(submissions: Submission[]): void {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!ArrayUtils.isEmpty(submissions)) {
      const eventSource = SubmissionService.getStream(submissions);
      eventSource.addEventListener('updateEntity', (event: any) => {
        const data = JSON.parse(event.data);
        const { entities } = normalize(data, submissionsSchema);
        dispatch(updateEntity({ entities }));
      });

      eventSource.addEventListener('end', () => {
        eventSource.close();
      });

      eventSource.onerror = () => {
        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    }
  }, [dispatch, JSON.stringify(submissions?.map((sub) => sub.judge))]);
}

export { useSubmissionStream };
