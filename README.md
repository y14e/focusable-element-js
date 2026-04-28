# focusable.ts

TS snippet for detecting and getting focusable element(s).

> [!NOTE]
> The `<fieldset>` element has some tricky specs, so we need to refactor the logic around it.

## Usage

```ts
import {
  getFocusables,
  getNextFocusable,
  getPreviousFocusable,
  hasFocusable,
  isFocusable,
} from './focusable'

const container = document.querySelector('.container');
const button = container.querySelector('.button');
```

### getFocusables

Returns all focusable elements within the container.

```ts
getFocusables(container);
// => HTMLElement[]
```

### getNextFocusable

Returns the next focusable element within the container, starting from `document.activeElement`.

```ts
getNextFocusable(container);
// => HTMLElement | null

// Starting from a specific element
getNextFocusable(container, { active: button });

// Wrap to the first element if necessary
getNextFocusable(container, { wrap: true });
```

### getPreviousFocusable

Returns the previous focusable element within the container, starting from `document.activeElement`.

```ts
getPreviousFocusable(container);
// => HTMLElement | null

// Starting from a specific element
getPreviousFocusable(container, { active: button });

// Wrap to the last element if necessary
getPreviousFocusable(container, { wrap: true });

```

### hasFocusable

Returns whether the container contains at least one focusable element.

```ts
hasFocusable(container);
// => boolean
```

### isFocusable

Returns whether the given element is focusable.

```ts
isFocusable(button);
// => boolean

```
