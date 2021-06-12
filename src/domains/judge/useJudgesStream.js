import * as React from 'react';
import { useDispatch } from 'react-redux';
import ArrayUtils from '../../utility/ArrayUtils';
import { JudgeService } from '../../service/JudgeService';
import { normalize } from 'normalizr';
import { updateEntity } from '../../store/actions/entity';
import { judgesSchema } from '../../entity-schemas';

export const useJudgesStream = judgeIds => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!ArrayUtils.isEmpty(judgeIds)) {
      const eventSource = JudgeService.getJudgesStream(judgeIds);
      eventSource.addEventListener('updateEntity', event => {
        const data = JSON.parse(event.data);
        const normalizedData = normalize(data, judgesSchema);
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
  }, [JSON.stringify(judgeIds)]);
};
