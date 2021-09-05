export interface SubmissionDTO {
  id: number;

  judge: number;

  language: string;

  disqualified: boolean;
}

export interface DetailedSubDTO extends SubmissionDTO {
  code: string;
}
