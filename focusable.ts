interface FocusableOptions {
  active?: HTMLElement | null;
  offset?: number;
  wrap?: boolean;
}

const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([aria-disabled="true"], [disabled], [hidden], [inert], [tabindex="-1"])';

export function isFocusable(element: HTMLElement): boolean {
  if (!element) return false;
  return element.matches(FOCUSABLE_SELECTOR) && !element.closest('[aria-disabled="true"], [inert]') && element.checkVisibility();
}

export function hasFocusable(container: HTMLElement = document.body ?? document.documentElement): boolean {
  if (!container) return false;
  return getFocusables(container).length > 0;
}

export function getFocusables(container: HTMLElement = document.body ?? document.documentElement): HTMLElement[] {
  if (!container) return [];
  const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  if (elements.length === 0) return [];
  const focusables: HTMLElement[] = [];
  for (const element of elements) {
    if (isFocusable(element)) {
      focusables.push(element);
    }
  }
  return focusables;
}

export function getPreviousFocusable(container: HTMLElement = document.body ?? document.documentElement, options: FocusableOptions = {}): HTMLElement | null {
  if (!container) return null;
  return getRelativeFocusable(container, { ...options, offset: -1 });
}

export function getNextFocusable(container: HTMLElement = document.body ?? document.documentElement, options: FocusableOptions = {}): HTMLElement | null {
  if (!container) return null;
  return getRelativeFocusable(container, { ...options, offset: 1 });
}

function getActiveElement(): HTMLElement | null {
  let active = document.activeElement;
  while (active instanceof HTMLElement && active.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active instanceof HTMLElement ? active : null;
}

function getRelativeFocusable(container: HTMLElement, { active, offset = 0, wrap = false }: FocusableOptions = {}): HTMLElement | null {
  const focusables = getFocusables(container);
  const { length } = focusables;
  if (length === 0) return null;
  const current = active || getActiveElement();
  if (!current || (!container.contains(current) && !container.shadowRoot?.contains(current))) return null;
  const currentIndex = focusables.indexOf(current);
  if (currentIndex === -1) return null;
  const offsetIndex = currentIndex + offset;
  if ((offsetIndex < 0 || offsetIndex >= length) && !wrap) return null;
  return focusables[(offsetIndex + length) % length];
}
