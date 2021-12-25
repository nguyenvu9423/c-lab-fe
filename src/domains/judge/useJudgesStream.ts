import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ArrayUtils } from '../../utility';
import { JudgeService } from '../../service/JudgeService';
import { normalize } from 'normalizr';
import { updateEntity } from '../../store/actions/entity';
import { judgesSchema } from '../../entity-schemas';

export const useJudgesStream = (judgeIds: number[]): void => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!ArrayUtils.isEmpty(judgeIds)) {
      const eventSource = JudgeService.getJudgesStream(judgeIds);

      eventSource.addEventListener('updateEntity', (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        const { entities } = normalize(data, judgesSchema);
        dispatch(updateEntity({ entities }));
      });

      eventSource.onerror = () => {
        eventSource.close();
      };

      return () => {
        console.log('closed');
        eventSource.close();
      };
    }
  }, [JSON.stringify(judgeIds)]);
};
