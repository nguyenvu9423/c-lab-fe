export function formatResourceTime(time: number | undefined | null): string {
  return time != null ? `${time} ms` : '--';
}

export function formatResourceMemory(
  memory: number | undefined | null
): string {
  return memory != null ? `${memory} mb` : '--';
}
