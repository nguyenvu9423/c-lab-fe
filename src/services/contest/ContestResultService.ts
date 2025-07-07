import { apiCaller } from '@/utils/Axios';
import { Pageable } from '@/utils/Pageable';
import { ServiceResponse } from '../types';

const BASE_URL = '/contests';

export namespace ContestResultService {
  export function getUserResults(params: {
    contestId: number;
    pageable?: Pageable;
  }): ServiceResponse {
    const { contestId, pageable } = params;
    return apiCaller.get(`${BASE_URL}/${contestId}/results`, {
      params: { ...pageable, detailed: true },
    });
  }
}
