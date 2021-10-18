export interface Submission {
  id: number;

  problem: {
    id: number;

    code: string;

    author: UserDTO;
  };

  user: UserDTO;

  judge: number;

  language: { name: string; title: string };

  submittedAt: string;

  disqualified: boolean;
}

interface UserDTO {
  id: number;
  username: string;
}

export interface DetailedSub extends Submission {
  code: string;
}
