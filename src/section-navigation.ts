import type { MouseEvent } from 'react';
// The destination itself must work when copied, opened with a modifier key,
// or visited before hydration. Reset all gallery filters, retain lang/UTM.
export { collectionHref } from './catalog';

// Static exports have no route-data endpoint; these links only move within this page.
export function navigateToSection(
  event: MouseEvent<HTMLAnchorElement>,
  section: 'top' | 'collection',
): boolean {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  event.preventDefault();
  const previousURL = location.href;
  history.replaceState(null, '', `${location.pathname}${location.search}#${section}`);
  // replaceState does not emit hashchange. Keep language/deep-link controls in
  // sync with programmatic section navigation just as with native anchors.
  if (previousURL !== location.href) window.dispatchEvent(new HashChangeEvent('hashchange', {oldURL:previousURL,newURL:location.href}));
  const target = document.getElementById(section);
  if (event.detail === 0) target?.focus({ preventScroll: true });
  target?.scrollIntoView();
  return true;
}
