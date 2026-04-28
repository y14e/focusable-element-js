# focusable.ts

TS snippet for detecting and getting focusable element(s).

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

**getFocusables**

```ts
getFocusables(container);
// => HTMLElement[]
```

**getNextFocusable**

```ts
getNextFocusable(container);
// => HTMLElement or null

// Next focusable element in container, starting from the specified active element
getNextFocusable(container, { active: button });

// Next focusable element in container, wrapping to the first if necessary
getNextFocusable(container, { wrap: true });
```

**getPreviousFocusable**

```ts
getPreviousFocusable(container);
// => HTMLElement or null

// Previous focusable element in container, starting from the specified active element
getPreviousFocusable(container, { active: button });

// Previous focusable element in container, wrapping to the last if necessary
getPreviousFocusable(container, { wrap: true });

```

**hasFocusable**

```ts
hasFocusable(container);
// => Boolean
```

**isFocusable**

```ts
isFocusable(button);
// => Boolean

```

## ToDo

The `<fieldset>` element has some tricky specs, so we need to refactor the logic around it.
