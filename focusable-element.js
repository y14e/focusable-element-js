const FOCUSABLE_SELECTOR = ':is(a[href], area[href], button, embed, iframe, input:not([type="hidden"]), object, select, details > summary:first-of-type, textarea, [contenteditable]:not([contenteditable="false"]), [controls], [tabindex]):not([disabled], [hidden], [tabindex="-1"])';

export function hasFocusableElement(container) {
  return !!getFocusableElements(container).length;
}

export function getFocusableElements(container) {
  const nodes = (container || document.body || document.documentElement).querySelectorAll(FOCUSABLE_SELECTOR);
  const elements = new Array(nodes.length);
  nodes.forEach((node, i) => {
    elements[i] = node;
  });
  const visibles = [];
  elements.forEach((element) => {
    if (element.checkVisibility()) {
      visibles.push(element);
    }
  });
  return visibles;
}

function getRelativeFocusableElement(container = document.body || document.documentElement, { active, offset = 0, wrap = false } = {}) {
  const focusables = getFocusableElements(container);
  const { length } = focusables;
  if (!length) return null;
  const getActiveElement = () => {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  };
  const current = active || getActiveElement();
  if (!current || !container.contains(current)) return null;
  const currentIndex = focusables.indexOf(current);
  if (currentIndex === -1) return null;
  const offsetIndex = currentIndex + offset;
  if ((offsetIndex < 0 || offsetIndex >= length) && !wrap) return null;
  return focusables[(offsetIndex + length) % length];
}

export function getNextFocusableElement(container, options = {}) {
  return getRelativeFocusableElement(container, { ...options, offset: 1 });
}

export function getPreviousFocusableElement(container, options = {}) {
  return getRelativeFocusableElement(container, { ...options, offset: -1 });
}
