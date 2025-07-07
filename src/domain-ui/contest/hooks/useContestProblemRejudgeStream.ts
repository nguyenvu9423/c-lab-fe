import * as React from 'react';
import { useDispatch } from 'react-redux';
import { normalize } from 'normalizr';
import { updateEntity } from '@/store/actions';
import { ContestRejudgeService } from '@/services/contest';
import { ContestProblemRejudgeArraySchema } from '@/entity-schemas/contest-problem-rejudge-schemas';
import { ArrayUtils } from '../../../utils';

export function useContestProblemRejudgeStream(ids: number[]): void {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!ArrayUtils.isEmpty(ids)) {
      const eventSource = ContestRejudgeService.getProblemRejudgeStream(ids);
      eventSource.addEventListener('updateEntity', (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        const { entities } = normalize(data, ContestProblemRejudgeArraySchema);
        dispatch(updateEntity({ entities }));
      });

      eventSource.onerror = () => {
        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    }
  }, [JSON.stringify(ids)]);
}
