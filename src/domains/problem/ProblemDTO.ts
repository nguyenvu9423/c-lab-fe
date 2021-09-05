import { SubmissionLanguage } from '../submission-lang/SubmissionLanguage';
import { TagDTO } from '../tag';

export interface ProblemDTO {
  id: number;

  code: string;

  title: string;

  author: number;

  definition: string;

  tags: TagDTO[];

  allowedLanguages: SubmissionLanguage[];

  solvedByPrincipal?: boolean;
}
