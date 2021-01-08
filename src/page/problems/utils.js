export function formatResourceTime(time) {
  return time ? `${time} ms` : '--';
}

export function formatResourceMemory(memory) {
  return memory ? `${memory} mb` : '--';
}
