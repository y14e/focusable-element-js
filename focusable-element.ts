const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(element: HTMLElement): boolean {
  return !!getFocusableElements(element).length;
}

export function getFocusableElements(element: HTMLElement): HTMLElement[] {
  function isVisible(element: Element): boolean {
    return !!element.getClientRects().length && window.getComputedStyle(element).visibility !== 'hidden';
  }
  return [...element.querySelectorAll(FOCUSABLE_SELECTOR)].filter(isVisible) as HTMLElement[];
}
