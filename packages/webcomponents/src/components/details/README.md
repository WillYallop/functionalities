# Details

The Details component is an enhanced version of the ``<details>`` element that adds accessibility attributes, an animation trigger for the content, and the option to close the detail on focusout. The Details component retains the functionality of the ``<details>`` element, even with JavaScript disabled.

## Quick Links

- [Getting Started](#getting-started)
- [Attributes](#attributes)
- [Future Development](#future-development)

## Getting Started

To use the Details component, import it and define it as a custom element:

```typescript
import { Details } from "@functionalities/webcomponents";

customElements.define("functionalities-details", Details);
```

Then, use it in your HTML:

```html
<functionalities-details close-on-leave="true">
    <details open>
        <summary>Close on focus: true</summary>
        <div>Open</div>
    </details>
</functionalities-details>
```

> The Details component requires the ``<details>``, ``<summary>``, and a content element to work.

## Attributes

The Details component supports the following attributes:

### close-on-leave

If set to ``"true"``, the details will close when the focus leaves the web component. If this functionality is not desired, the attribute can be omitted or set to false.

### open

Setting the open attribute on the ``<functionalities-details>`` element will set the ``<details>`` element to open by default. If set or removed programmatically, it will update the ``<details>`` element below. 

> If you want it open by default, it is better practice to put the open attribute on the ``<details>`` element. When the ``<functionalities-details>`` is initiated, it will see this and set the open attribute on itself. This way, if JavaScript is disabled, it will still have the same default state.

## Future Development
- Add a hover attribute on the detials component to open the detail when hovered, and close it when the mouse exits the component.
Touch device hover/click may conflict, would need some locking system if one is detected.