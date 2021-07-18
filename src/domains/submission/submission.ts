export interface Submission {
  id: number;

  judge: number;

  language: string;
}

export interface DetailedSub extends Submission {
  code: string;
}
