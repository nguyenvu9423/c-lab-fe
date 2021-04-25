export function formatResourceTime(time) {
  return time != null ? `${time} ms` : '--';
}

export function formatResourceMemory(memory) {
  return memory != null ? `${memory} mb` : '--';
}
