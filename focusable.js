const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([aria-disabled="true"], [disabled], [hidden], [inert], [tabindex="-1"])';

export function isFocusable(element) {
  if (!element) {
    return false;
  }
  return element.matches(FOCUSABLE_SELECTOR) && !element.parentElement?.closest('[aria-disabled="true"], [inert]') && element.checkVisibility({ contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true });
}

export function hasFocusable(container = document.body) {
  if (!container) {
    return false;
  }
  return getFocusables(container).length > 0;
}

export function getFocusables(container = document.body) {
  if (!container) {
    return [];
  }
  const elements = container.querySelectorAll(FOCUSABLE_SELECTOR);
  if (elements.length === 0) {
    return [];
  }
  const focusables = [];
  for (const element of elements) {
    if (isFocusable(element)) {
      focusables.push(element);
    }
  }
  return focusables;
}

export function getPreviousFocusable(container = document.body, options = {}) {
  if (!container) {
    return null;
  }
  return getRelativeFocusable(container, { ...options, offset: -1 });
}

export function getNextFocusable(container = document.body, options = {}) {
  if (!container) {
    return null;
  }
  return getRelativeFocusable(container, { ...options, offset: 1 });
}

function containsDeep(container, node) {
  for (let current = node; current; current = current instanceof ShadowRoot ? current.host : current.parentNode) {
    if (current === container) {
      return true;
    }
  }
  return false;
}

function getActiveElement() {
  let active = document.activeElement;
  while (active instanceof HTMLElement && active.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active instanceof HTMLElement ? active : null;
}

function getRelativeFocusable(container, options = {}) {
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
  return focusables[(offsetIndex + length) % length];
}
