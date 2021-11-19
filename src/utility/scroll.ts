export function scrollToElementTop(element: HTMLElement): void {
  const newScrollY = element.getBoundingClientRect().y + window.scrollY - 61;
  if (newScrollY < window.scrollY) {
    scrollTo({ top: newScrollY });
  }
}
