export interface FocusableOptions {
  readonly active?: HTMLElement | null;
  readonly offset?: number;
  readonly wrap?: boolean;
}

const FOCUSABLE_SELECTOR = `:is(a[href], area[href], button, embed, iframe, input:not([type="hidden" i]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false" i]), [controls], [tabindex]):not([aria-disabled="true" i], :disabled, [hidden], [inert], [tabindex="-1"])`;

export function getFocusables(container: HTMLElement = document.body): HTMLElement[] {
  if (!container) {
    return [];
  }

  return [...container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter((element) => isFocusable(element));
}

export function getNextFocusable(
  container: HTMLElement = document.body,
  options: FocusableOptions = {},
): HTMLElement | null {
  if (!container) {
    return null;
  }

  return getRelativeFocusable(container, { ...options, offset: 1 });
}

export function getPreviousFocusable(
  container: HTMLElement = document.body,
  options: FocusableOptions = {},
): HTMLElement | null {
  if (!container) {
    return null;
  }

  return getRelativeFocusable(container, { ...options, offset: -1 });
}

export function hasFocusable(container: HTMLElement = document.body): boolean {
  if (!container) {
    return false;
  }

  return getFocusables(container).length > 0;
}

export function isFocusable(element: HTMLElement): boolean {
  if (!element) {
    return false;
  }

  return (
    element.matches(FOCUSABLE_SELECTOR) &&
    !disabledDeep(element) &&
    element.checkVisibility({
      contentVisibilityAuto: true,
      opacityProperty: true,
      visibilityProperty: true,
    })
  );
}

function containsDeep(container: Node, node: Node): boolean {
  for (
    let current: Node | null = node;
    current;
    current = !(current instanceof ShadowRoot) ? current.parentNode : current.host
  ) {
    if (current === container) {
      return true;
    }
  }

  return false;
}

function disabledDeep(element: Element): boolean {
  for (
    let current: Node | null = element.parentNode;
    current;
    current = !(current instanceof ShadowRoot) ? current.parentNode : current.host
  ) {
    if (current instanceof Element && current.matches('[aria-disabled="true" i], [inert]')) {
      return true;
    }
  }

  return false;
}

function getActiveElement(): HTMLElement | null {
  let active = document.activeElement;

  while (active instanceof HTMLElement && active.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }

  return active instanceof HTMLElement ? active : null;
}

function getRelativeFocusable(container: HTMLElement, options: FocusableOptions = {}): HTMLElement | null {
  const { active, offset = 0, wrap = false } = options;
  const focusables = getFocusables(container);
  const { length } = focusables;

  if (length === 0) {
    return null;
  }

  const current = active ?? getActiveElement();

  if (!current || !containsDeep(container, current)) {
    return null;
  }

  const currentIndex = focusables.indexOf(current);

  if (currentIndex === -1) {
    return null;
  }

  const offsetIndex = currentIndex + offset;

  if ((offsetIndex < 0 || offsetIndex >= length) && !wrap) {
    return null;
  }

  return focusables[(offsetIndex + length) % length] as HTMLElement;
}
