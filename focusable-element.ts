type FocusableElementOptions = {
  current?: HTMLElement | null;
  offset: number;
  wrap?: boolean;
};

const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(container?: HTMLElement | null): boolean {
  return !!getFocusableElements(container).length;
}

export function getFocusableElements(container?: HTMLElement | null): HTMLElement[] {
  return [...(container || document.body || document.documentElement).querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(element => element.checkVisibility());
}

function getRelativeFocusableElement(container: HTMLElement | null = document.body || document.documentElement, { current, offset, wrap = false }: FocusableElementOptions): HTMLElement | null {
  const focusables = getFocusableElements(container);
  const length = focusables.length;
  if (!length) return null;
  const getActiveElement = (): HTMLElement | null => {
    let active = document.activeElement;
    while (active && active.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
    return active as HTMLElement | null;
  };
  current = current || getActiveElement();
  if (!current) return null;
  const currentIndex = focusables.indexOf(current);
  if (currentIndex === -1) return null;
  const offsetIndex = currentIndex + offset;
  if ((offsetIndex < 0 || offsetIndex >= length) && !wrap) return null;
  return focusables[(offsetIndex + length) % length];
}

export function getNextFocusableElement(container?: HTMLElement | null, options: Omit<Partial<FocusableElementOptions>, 'offset'> = {}): HTMLElement | null {
  return getRelativeFocusableElement(container, { ...options, offset: 1 });
}

export function getPreviousFocusableElement(container?: HTMLElement | null, options: Omit<Partial<FocusableElementOptions>, 'offset'> = {}): HTMLElement | null {
  return getRelativeFocusableElement(container, { ...options, offset: -1 });
}
