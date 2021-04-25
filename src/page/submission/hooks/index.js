import * as React from 'react';
import { normalize } from 'normalizr';
import { submissionListSchema } from '../../../entity-schemas/submissionSchema';
import { SubmissionService } from '../../../service/SubmissionService';
import ArrayUtils from '../../../utility/ArrayUtils';
import { updateEntity } from '../../../store/actions/entity';
import { useDispatch } from 'react-redux';
import { SubmissionProgressType } from '../../../domains/submission';

const useSubmissionStream = submissions => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const streamedSubmissions = submissions.filter(
      sub => sub.progress.status.type === SubmissionProgressType.IN_PROGRESS
    );
    if (!ArrayUtils.isEmpty(streamedSubmissions)) {
      const eventSource = SubmissionService.getStream(streamedSubmissions);
      eventSource.addEventListener('updateEntity', event => {
        const data = JSON.parse(event.data);
        const normalizedData = normalize(data, submissionListSchema);
        dispatch(updateEntity(normalizedData.entities));
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
  }, [JSON.stringify(submissions.map(sub => sub.id))]);
};

export { useSubmissionStream };
