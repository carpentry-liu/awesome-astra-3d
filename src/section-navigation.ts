import type { MouseEvent } from 'react';

// Static exports have no route-data endpoint; these links only move within this page.
export function navigateToSection(
  event: MouseEvent<HTMLAnchorElement>,
  section: 'top' | 'collection',
): boolean {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  event.preventDefault();
  history.replaceState(null, '', `${location.pathname}${location.search}#${section}`);
  const target = document.getElementById(section);
  if (event.detail === 0) target?.focus({ preventScroll: true });
  target?.scrollIntoView();
  return true;
}
