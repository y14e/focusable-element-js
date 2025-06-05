const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, textarea, [contenteditable]:not([contenteditable="false"]), [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(element: HTMLElement): boolean {
  return !!getFocusableElements(element).length;
}

export function getFocusableElements(element: HTMLElement): HTMLElement[] {
  function isVisible(element: Element): boolean {
    const style = window.getComputedStyle(element);
    return !!element.getClientRects().length && style.visibility !== 'hidden' && style.display !== 'none';
  }
  return [...element.querySelectorAll(FOCUSABLE_SELECTOR)].filter(isVisible) as HTMLElement[];
}
