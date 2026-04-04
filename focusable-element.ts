interface FocusableElementOptions {
  active?: HTMLElement | null;
  offset?: number;
  wrap?: boolean;
}

const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(container: HTMLElement = document.body || document.documentElement): boolean {
  if (!container) return false;
  return getFocusableElements(container).length > 0;
}

export function getFocusableElements(container: HTMLElement = document.body || document.documentElement): HTMLElement[] {
  if (!container) return [];
  const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  if (elements.length === 0) return [];
  const focusables: HTMLElement[] = [];
  for (const focusable of elements) {
    if (focusable.checkVisibility()) {
      focusables.push(focusable);
    }
  }
  return focusables;
}

function getRelativeFocusableElement(container: HTMLElement, { active, offset = 0, wrap = false }: FocusableElementOptions = {}): HTMLElement | null {
  const focusables = getFocusableElements(container);
  const { length } = focusables;
  if (length === 0) return null;
  const current = active || getActiveElement();
  if (!current || !container.contains(current)) return null;
  const currentIndex = focusables.indexOf(current);
  if (currentIndex === -1) return null;
  const offsetIndex = currentIndex + offset;
  if ((offsetIndex < 0 || offsetIndex >= length) && !wrap) return null;
  return focusables[(offsetIndex + length) % length];
}

export function getNextFocusableElement(container: HTMLElement = document.body || document.documentElement, options: FocusableElementOptions = {}): HTMLElement | null {
  if (!container) return null;
  return getRelativeFocusableElement(container, { ...options, offset: 1 });
}

export function getPreviousFocusableElement(container: HTMLElement = document.body || document.documentElement, options: FocusableElementOptions = {}): HTMLElement | null {
  if (!container) return null;
  return getRelativeFocusableElement(container, { ...options, offset: -1 });
}

function getActiveElement(): HTMLElement | null {
  let active = document.activeElement;
  while (active instanceof HTMLElement && active.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active instanceof HTMLElement ? active : null;
}
