const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(element) {
  return !!getFocusableElements(element).length;
}

export function getFocusableElements(element) {
  return [...element.querySelectorAll(FOCUSABLE_SELECTOR)].filter(element => element.checkVisibility());
}
