const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(container) {
  return !!getFocusableElements(container).length;
}

export function getFocusableElements(container) {
  return [...(container || document.body || document.documentElement).querySelectorAll(FOCUSABLE_SELECTOR)].filter(element => element.checkVisibility());
}

function getRelativeFocusableElement(container = document.body || document.documentElement, { offset, current = document.activeElement, wrap = false }) {
  const focusables = getFocusableElements(container);
  const length = focusables.length;
  if (!length) {
    return null;
  }
  const active = document.activeElement;
  current = current instanceof HTMLElement ? current : active instanceof HTMLElement ? active : null;
  if (!current) {
    return null;
  }
  const currentIndex = focusables.indexOf(current);
  if (currentIndex === -1) {
    return null;
  }
  const offsetIndex = currentIndex + offset;
  if ((offsetIndex < 0 || offsetIndex >= length) && !wrap) {
    return null;
  }
  return focusables[(offsetIndex + length) % length];
}

export function getNextFocusableElement(container, options = {}) {
  return getRelativeFocusableElement(container, { ...options, offset: 1 });
}

export function getPreviousFocusableElement(container, options = {}) {
  return getRelativeFocusableElement(container, { ...options, offset: -1 });
}
