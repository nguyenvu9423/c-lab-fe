export interface NormalizedEntities<T = any> {
  [key: string]:
    | {
        [key: string]: T;
      }
    | undefined;
}
