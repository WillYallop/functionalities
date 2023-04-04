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
- Optional ``body-class`` attribute.
- Optional ``close-on-leave`` attribute.
- Optional ``open-on-hover`` attribute.
- Optional ``open-on-focus`` attribute.

## Getting Started

To use the Checkbox Toggler component, import it and define it as a custom element:

```typescript
import { CheckboxToggler } from "@functionalities/webcomponents";

customElements.define("checkbox-toggler", CheckboxToggler);
```

Then, use it in your HTML:

```html
<checkbox-toggler
    input-id="input"
    target-id="dropdown"
    body-class="checkbox-active"
    close-on-leave
    open-on-hover
    open-on-focus
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
    id="input"
    class="hidden"
  />
  <div id="dropdown">
    Dropdown Content
  </div>
</checkbox-toggler>
```

> The tabindex, aria-expanded, aria-controls and role attributes on the element will be added automatically with the component if not present. Though for the best accessible experience if JS is disabled, it is recceomended you add these in your markup.

## Attributes

The Checkbox Toggler component supports the following attributes:

### input-id (required)

This should be a unique ID that is used on the input and the label's for attribute.

### target-id (required)

This is the target you wish to toggles ID. This value is only used for setting the aria-controls value on the label if you choose not to add it to the label (you should add it to the label).

### body-class (optional)

If the attribute is present, whenever the checkbox is checked, the value of this attribute will be added to the bodies class.

### close-on-leave (optional)

If the attribute is present, the checkbox will be set to false when the focus leaves the web component.

### open-on-hover (optional)

If the attribute is present, the checkbox will be set to checked if the web component is hovered.

### open-on-focus (optional)

If the attribute is present, the checkbox will be set to checked if the webcomponent is focused.

## Future Development
- Fix bug with clicking to toggle when focus on is active. Causes it to close after clicking opens and brings focus to it.