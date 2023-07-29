export namespace ArrayUtils {
  export function isEmpty(arr: unknown): boolean {
    return !arr || (Array.isArray(arr) && arr.length === 0);
  }

  export function isNotEmpty(arr: unknown): boolean {
    return !this.isEmpty(arr);
  }
}

export const Comparators = {
  byIdDesc: (a: { id: number }, b: { id: number }): number => b.id - a.id,
};
