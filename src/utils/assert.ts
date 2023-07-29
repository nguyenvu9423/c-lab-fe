export function assert<T>(field: T | undefined, msg?: string): field is T {
  if (field) {
    throw new Error(msg);
  }
  return true;
}
