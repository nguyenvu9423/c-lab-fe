import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ProblemRejudgeService } from '@/services/judge/ProblemRejudgeService';
import { ArrayUtils } from '../../../utils';
import { normalize } from 'normalizr';
import { updateEntity } from '@/store/actions';
import { ProblemRejudgeArraySchema } from '../../../entity-schemas/problemRejudge';

export function useProblemRejudgeStream(ids: number[]): void {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!ArrayUtils.isEmpty(ids)) {
      const eventSource = ProblemRejudgeService.getStream(ids);
      eventSource.addEventListener('updateEntity', (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        const { entities } = normalize(data, ProblemRejudgeArraySchema);
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
