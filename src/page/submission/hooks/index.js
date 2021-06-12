import * as React from 'react';
import { normalize } from 'normalizr';
import { submissionsSchema } from '../../../entity-schemas';
import { SubmissionService } from '../../../service/SubmissionService';
import ArrayUtils from '../../../utility/ArrayUtils';
import { updateEntity } from '../../../store/actions/entity';
import { useDispatch } from 'react-redux';
import { JudgeProgressType } from '../../../domains/judge';

const useSubmissionStream = submissions => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const streamedSubmissions = submissions?.filter(
      sub => sub.judge.progress.status.type === JudgeProgressType.IN_PROGRESS
    );
    if (!ArrayUtils.isEmpty(streamedSubmissions)) {
      const eventSource = SubmissionService.getStream(streamedSubmissions);
      eventSource.addEventListener('updateEntity', event => {
        const data = JSON.parse(event.data);
        const normalizedData = normalize(data, submissionsSchema);
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
  }, [JSON.stringify(submissions?.map(sub => sub.id))]);
};

export { useSubmissionStream };
