export interface CreateContestRequestDto {
  name: string;

  description: string;

  overview?: string;

  start: string;

  end: string;
}
