const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(container) {
  return !!getFocusableElements(container).length;
}

export function getFocusableElements(container) {
  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(element => element.checkVisibility());
}

export function getNextFocusableElement(container, current, loop = false) {
  const focusables = getFocusableElements(container || document.body);
  if (!focusables.length) {
    return null;
  }
  const index = focusables.indexOf(current || document.activeElement);
  if (index === -1) {
    return null;
  }
  if (index === focusables.length - 1) {
    return !loop ? null : focusables[0];
  }
  return focusables[index + 1];
}

export function getPreviousFocusableElement(container, current, loop = false) {
  const focusables = getFocusableElements(container || document.body);
  if (!focusables.length) {
    return null;
  }
  const index = focusables.indexOf(current || document.activeElement);
  if (index === -1) {
    return null;
  }
  if (!index) {
    return !loop ? null : focusables[focusables.length - 1];
  }
  return focusables[index - 1];
}
