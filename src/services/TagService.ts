import { TagDTO } from './dtos';
import { Pageable } from '../utils';
import { apiCaller } from '../utils/Axios';
import { Page, ServiceResponse } from './types';

const BASE_URL = '/tags';

export namespace TagService {
  export function createTag(tag: TagDTO): ServiceResponse<TagDTO> {
    return apiCaller.post(BASE_URL, tag);
  }

  export function getTags(
    pageable?: Pageable,
    query?: string
  ): ServiceResponse<Page<TagDTO>> {
    return apiCaller.get(BASE_URL, {
      params: {
        page: pageable?.page,
        size: pageable?.size,
        query,
      },
    });
  }

  export function getTagsByContainedText(
    text: string,
    pageable?: Pageable
  ): ServiceResponse<Page<TagDTO>> {
    return apiCaller.get(BASE_URL, {
      params: {
        contain: text,
        page: pageable?.page,
        size: pageable?.size,
      },
    });
  }

  export function getTagById(id: number | string): ServiceResponse<TagDTO> {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

  export function updateTag(
    id: number | string,
    tag: TagDTO
  ): ServiceResponse<TagDTO> {
    return apiCaller.put(`${BASE_URL}/${id}`, tag);
  }

  export function deleteTag(
    id: number | string,
    forced = false
  ): ServiceResponse<TagDTO> {
    return apiCaller.delete(`${BASE_URL}/${id}`, {
      params: {
        forced,
      },
    });
  }
}
