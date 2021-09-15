export interface Test {
  id: number;

  name: string;

  input: {
    path: string;

    overview: string;
  };

  output: {
    path: string;

    overview: string;
  };
}
