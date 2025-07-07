import { apiCaller } from '@/utils/Axios';
import { Pageable } from '../../utils';
import { ContestCreationRequestDto } from '../dtos';
import { Contest } from '@/domains/contest';
import { ServiceResponse } from '../types';
import { ContestDto, UpdateContestRequestDto } from '../dtos/contest';
import { UpdateContestJudgeConfigDto } from '../dtos/contest/UpdateContestJudgeConfigDto';
import QueryString from 'qs';
import { SortCriteria } from '@/shared/types';

const BASE_URL = '/contests';

export namespace ContestService {
  export function create(
    input: ContestCreationRequestDto,
  ): ServiceResponse<Contest> {
    return apiCaller.post(BASE_URL, input);
  }

  export function getContests(params?: {
    query?: string;
    pageable?: Pageable;
    sort?: SortCriteria;
  }) {
    const { query, pageable, sort } = params ?? {};

    const sortParams = sort
      ? sort.map(({ key, direction }) => `${key},${direction}`)
      : undefined;

    return apiCaller.get(BASE_URL, {
      params: { ...pageable, sort: sortParams, query },
      paramsSerializer: (params) => {
        return QueryString.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  }

  export function getContest(id: number): Promise<Contest> {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

  export function update(
    id: number,
    input: UpdateContestRequestDto,
  ): ServiceResponse<Contest> {
    return apiCaller.patch(`${BASE_URL}/${id}`, input);
  }

  export function updateJudgeConfig(
    id: number,
    input: UpdateContestJudgeConfigDto,
  ): ServiceResponse<ContestDto> {
    return apiCaller.patch(`${BASE_URL}/${id}/judge`, input);
  }

  export function deleteContest(contestId: number): ServiceResponse {
    return apiCaller.delete(`${BASE_URL}/${contestId}`);
  }
}
