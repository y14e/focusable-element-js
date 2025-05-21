const FOCUSABLE_SELECTOR = 'a[href], area[href], button:not([disabled]), embed, iframe, input:not([disabled]):not([type="hidden"]), object, select:not([disabled]), textarea:not([disabled]), [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';

export function hasFocusableElement(element: HTMLElement): boolean {
  return !!element.querySelector(FOCUSABLE_SELECTOR);
}

export function getFocusableElements(element: HTMLElement): HTMLElement[] {
  return [...element.querySelectorAll(FOCUSABLE_SELECTOR)] as HTMLElement[];
}
