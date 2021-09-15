import { SubmissionLanguage } from '../submission-lang/SubmissionLanguage';
import { TagDTO } from '../tag';
import { UserDTO } from '../user';

export interface ProblemDTO {
  id: number;

  code: string;

  title: string;

  author: UserDTO;

  definition: string;

  tags: TagDTO[];

  allowedLanguages: SubmissionLanguage[];

  solvedByPrincipal?: boolean;
}
