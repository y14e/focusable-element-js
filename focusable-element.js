const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(element) {
  return !!getFocusableElements(element).length;
}

export function getFocusableElements(element) {
  return [...element.querySelectorAll(FOCUSABLE_SELECTOR)].filter(element => element.checkVisibility());
}

export function getNextFocusableElement(root, from, loop = false) {
  const focusables = getFocusableElements(root || document.body);
  if (!focusables.length) {
    return null;
  }
  const index = focusables.indexOf(from || document.activeElement);
  if (index === -1 || index === focusables.length - 1) {
    return !loop ? null : focusables[0];
  }
  return focusables[index + 1];
}

export function getPreviousFocusableElement(root, from, loop = false) {
  const focusables = getFocusableElements(root || document.body);
  if (!focusables.length) {
    return null;
  }
  const index = focusables.indexOf(from || document.activeElement);
  if (index === -1 || !index) {
    return !loop ? null : focusables[focusables.length - 1];
  }
  return focusables[index - 1];
}
