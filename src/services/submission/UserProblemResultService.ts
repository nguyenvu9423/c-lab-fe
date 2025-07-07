import { apiCaller } from '@/utils/Axios';
import { ServiceResponse } from '../types';
import { UserProblemResultDto } from '../dtos/submission';
import QueryString from 'qs';

const BASE_URL = '/results';

export namespace UserProblemResultService {
  export function getResultsByUsernamesAndProblems(
    userIds: number[],
    problemIds: number[],
  ): ServiceResponse<UserProblemResultDto> {
    return apiCaller.get(BASE_URL, {
      params: {
        userIds,
        problemIds,
      },
      paramsSerializer: (params) => {
        return QueryString.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  }
}
