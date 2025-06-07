const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(container) {
  return !!getFocusableElements(container).length;
}

export function getFocusableElements(container) {
  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(element => element.checkVisibility());
}

function getFocusableElementByOffset(offset, container, current, wrap = false) {
  const focusables = getFocusableElements(container || document.body);
  const length = focusables.length;
  if (!length) {
    return null;
  }
  const currentIndex = focusables.indexOf(current || document.activeElement);
  if (currentIndex === -1) {
    return null;
  }
  let newIndex = currentIndex + offset;
  if (!wrap && (newIndex < 0 || newIndex >= length)) {
    return null;
  } else {
    newIndex = (newIndex + length) % length;
  }
  return focusables[newIndex];
}

export function getNextFocusableElement(container, current, wrap = false) {
  return getFocusableElementByOffset(1, container, current, wrap);
}

export function getPreviousFocusableElement(container, current, wrap = false) {
  return getFocusableElementByOffset(-1, container, current, wrap);
}
