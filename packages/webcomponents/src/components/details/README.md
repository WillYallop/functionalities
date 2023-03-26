# Details

The Details component is an enhanced version of the ``<details>`` element that adds accessibility attributes, an animation trigger for the content, and the option to close the detail on focusout. The Details component retains the functionality of the ``<details>`` element, even with JavaScript disabled.

**Note:**
If you wish to animate the content in and out, you should use the ``CheckboxToggler`` component instead. This is because the details and summary elements with CSS can only animate the content in, not out, and also have very inconsistent behavior across browsers. The ``CheckboxToggler`` is also accessible and works without JavaScript enabled.

## Quick Links

- [Features](#features)
- [Getting Started](#getting-started)
- [Attributes](#attributes)
- [Future Development](#future-development)

## Features
- Fully accessible!
- Progressivly enhanced ``<details>``.
- Optional ``close-on-leave`` attribute.

## Getting Started

To use the Details component, import it and define it as a custom element:

```typescript
import { Details } from "@functionalities/webcomponents";

customElements.define("functionalities-details", Details);
```

Then, use it in your HTML:

```html
<functionalities-details
    body-class="details-active"
    close-on-leave
    open-on-hover
    open-on-focus
    open
>
    <details open>
        <summary>Close on focus: true</summary>
        <div>Open</div>
    </details>
</functionalities-details>
```

> The Details component requires the ``<details>``, ``<summary>``, and a content element to work.

## Attributes

The Details component supports the following attributes:

### open (optional)

Setting the open attribute on the ``<functionalities-details>`` element will set the ``<details>`` element to open by default. If set or removed programmatically, it will update the ``<details>`` element below. 

> If you want it open by default, it is better practice to put the open attribute on the ``<details>`` element. When the ``<functionalities-details>`` is initiated, it will see this and set the open attribute on itself. This way, if JavaScript is disabled, it will still have the same default state.

### body-class (optional)

If the attribute is present, whenever the details is open, the value of this attribute will be added to the bodies class.

### close-on-leave (optional)

If the attribute is present on the component, the details will close when the focus leaves the web component.

### open-on-hover (optional)

If the attribute is present, the details will open if hovered.

### open-on-focus (optional)

If the attribute is present, the details will open if focused. 

## Future Development
