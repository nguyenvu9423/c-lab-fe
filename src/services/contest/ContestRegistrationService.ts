import { apiCaller } from '@/utils/Axios';
import { ServiceResponse } from '../types';
import { UserContestRegistrationDto } from '../dtos/contest';
import QueryString from 'qs';
import { Pageable } from '@/utils/Pageable';

const BASE_URL = '/contest-registrations';

export namespace ContestRegistrationService {
  export function getAllByContest(
    contestId: number,
    pageable: Pageable,
  ): ServiceResponse<UserContestRegistrationDto> {
    return apiCaller.get(BASE_URL, {
      params: { ...pageable, contestId },
    });
  }

  export function getAllByUserAndContests(
    userId: number,
    contestIds: number[],
    pageable: Pageable,
  ): ServiceResponse<UserContestRegistrationDto> {
    return apiCaller.get(BASE_URL, {
      params: {
        ...pageable,
        userId,
        contestIds,
      },
      paramsSerializer: (params) => {
        return QueryString.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  }

  export function getByUserAndContest(
    userId: number,
    contestId: number,
  ): ServiceResponse<UserContestRegistrationDto> {
    return apiCaller.get(BASE_URL, {
      params: {
        userId,
        contestId,
      },
    });
  }

  export function registerUser(
    userId: number,
    contestId: number,
  ): ServiceResponse<UserContestRegistrationDto> {
    return apiCaller.post(BASE_URL, undefined, {
      params: { userId, contestId },
    });
  }

  export function unregisterUser(
    userId: number,
    contestId: number,
  ): ServiceResponse {
    return apiCaller.delete(BASE_URL, {
      params: { userId, contestId },
    });
  }
}
