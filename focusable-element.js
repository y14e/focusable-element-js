const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';
export function hasFocusableElement(container = document.body || document.documentElement) {
  if (!container) return false;
  return !!getFocusableElements(container).length;
}
export function getFocusableElements(container = document.body || document.documentElement) {
  if (!container) return [];
  const elements = container.querySelectorAll(FOCUSABLE_SELECTOR);
  const { length } = elements;
  if (!length) return [];
  const focusables = new Array(length);
  let i = 0;
  for (let j = 0; j < length; j++) {
    const focusable = elements[j];
    if (focusable.checkVisibility()) {
      focusables[i++] = focusable;
    }
  }
  focusables.length = i;
  return focusables;
}
function getRelativeFocusableElement(container, { active, offset = 0, wrap = false } = {}) {
  const focusables = getFocusableElements(container);
  const { length } = focusables;
  if (!length) return null;
  const current = active || getActiveElement();
  if (!current || !container.contains(current)) return null;
  const currentIndex = focusables.indexOf(current);
  if (currentIndex === -1) return null;
  const offsetIndex = currentIndex + offset;
  if ((offsetIndex < 0 || offsetIndex >= length) && !wrap) return null;
  return focusables[(offsetIndex + length) % length];
}
export function getNextFocusableElement(container = document.body || document.documentElement, options = {}) {
  if (!container) return null;
  return getRelativeFocusableElement(container, { ...options, offset: 1 });
}
export function getPreviousFocusableElement(container = document.body || document.documentElement, options = {}) {
  if (!container) return null;
  return getRelativeFocusableElement(container, { ...options, offset: -1 });
}
function getActiveElement() {
  let active = document.activeElement;
  while (active instanceof HTMLElement && active.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active instanceof HTMLElement ? active : null;
}
