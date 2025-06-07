const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(container: HTMLElement): boolean {
  return !!getFocusableElements(container).length;
}

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(element => element.checkVisibility()) as HTMLElement[];
}

function getRelativeFocusableElement(offset: number, container: HTMLElement, current: HTMLElement, wrap = false): HTMLElement | null {
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

export function getNextFocusableElement(container: HTMLElement, current: HTMLElement, wrap = false): HTMLElement | null {
  return getRelativeFocusableElement(1, container, current, wrap);
}

export function getPreviousFocusableElement(container: HTMLElement, current: HTMLElement, wrap = false): HTMLElement | null {
  return getRelativeFocusableElement(-1, container, current, wrap);
}
