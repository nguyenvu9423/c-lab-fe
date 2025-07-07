import { TagDTO } from './TagDTO';
import { UserDTO } from './user';

export interface ProblemDTO {
  id: number;

  code: string;

  title: string;

  author: UserDTO;

  definition: string;

  tags: TagDTO[];
}
