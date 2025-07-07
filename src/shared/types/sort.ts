export type SortCriteria = SortKeyDirectionPair[];

export interface SortKeyDirectionPair {
  key: string;

  direction: SortDirection;
}

export enum SortDirection {
  ASC = 'ASC',

  DESC = 'DESC',
}
