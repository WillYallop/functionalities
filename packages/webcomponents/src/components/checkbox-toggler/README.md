# Checkbox Toggler

A simple, accessible web component that allows users to toggle the state of a checkbox and reveal or hide an associated content container. This is not intended to be used as a standard checkbox, but instead, as an accessible and progressive solution to hiding content that would work in case a user has JavaScript disabled in their browser.

> This web component does not add any classes when active. To hide and show the toggled content, you should use CSS and the input's ``:checked`` selector!

## Quick Links
- [Features](#features)
- [Getting Started](#getting-started)
- [Attributes](#attributes)
- [Future Development](#future-development)

## Features
- Fully accessible!
- Works without JS enabled.

## Getting Started

To use the Checkbox Toggler component, import it and define it as a custom element:

```typescript
import { CheckboxToggler } from "@functionalities/webcomponents";

customElements.define("functionalities-checkbox-toggler", CheckboxToggler);
```

Then, use it in your HTML:

```html
<functionalities-checkbox-toggler
  data-id="input"
  data-target-id="dropdown"
>
  <label
    tabindex="0"
    role="button"
    aria-expanded="false"
    aria-controls="dropdown"
    for="input"
  >
    Toggle
  </label>
  <input
    type="checkbox"
    id="checkbox-input"
    class="hidden"
  />
  <div id="dropdown">
    Dropdown Content
  </div>
</functionalities-checkbox-toggler>
```

> The tabindex, aria-expanded, aria-controls and role attributes on the element will be added automatically with the component if not present. Though for the best accessible experience if JS is disabled, it is recceomended you add these in your markup.

## Attributes

The Checkbox Toggler component supports the following attributes:

### data-id

This should be a unique ID that is used on the input and the label's for attribute.

### data-target-id

This is the target you wish to toggles ID. This value is only used for setting the aria-controls value on the label if you choose not to add it to the label (you should add it to the label).

## Future Development
