# Sticky Header

The Sticky Header web component is a lightweight and flexible way of updating your header style depending on the scroll position of the page. It has three states, one for being at the top of the page, scrolling down and scrolling up, each of which will add a unique class allowing you to style it however you like.

## Quick Links

- [Features](#features)
- [Getting Started](#getting-started)
- [Attributes](#attributes)
- [Future Development](#future-development)

## Features
- 3 scroll states.
- Has a callback function that fires on state change.
- Has a callback function that fires on window scroll.
- Trigger offset can be set with attribtues.

## Getting Started

To use the Sticky Header component, import it and define it as a custom element:

```typescript
import { StickyHeader } from "@functionalities/webcomponents";

customElements.define("functionalities-sticky-header", StickyHeader);
```

Then, use it in your HTML:

```html
<functionalities-sticky-header
    on-change="windowOnChange"
    on-scroll="windowOnScroll"
    trigger-offset="200"
>
    <header>
        <h1>My Website</h1>
    </header>
</functionalities-sticky-header>
```

> The attributes on the ``<functionalities-sticky-header>`` element are not required.

## Classes

### .sticky-top

This is the class used to represent the header being at the top of the page. This is applied when the header's top distance is less than the internal triggerOffset value. Find out more about that [here](#trigger-offset).

### .sticky-down

This is the class used to represent if the user's last scroll action was down.

### .sticky-up

This is the class used to represent if the user's last scroll action was up.

## Attributes

The Sticky Header component supports the following attributes:

### trigger-offset

The trigger offset determines how far down the page the Sticky Header should wait before applying the state classes. By default the Sticky Header component uses its own offsetHeight as it trigger offset, but with the ``trigger-offset`` value applied, it will use that instead. The component listens to changes for attribute so any changes made to it get applied straight away.

### on-change

The ``on-change`` attribute takes in a function name that resides on the window object. This callback is fired whenever the state of the Sticky Header changes. This can be used as a callback. This returns the following data:

```typescript
{
    state: 'sticky-top',
    prevState: 'sticky-down',
    scrollPos: 100
}
```

### on-scroll

The ``on-scroll`` attribute takes in a function name that resides on the window object. This callback is fired whenever the window scroll event fires. This can be used as a callback. This returns the following data:

```typescript
{
    state: 'sticky-top',
    prevState: 'sticky-down',
    scrollPos: 100
}
```

## Future Development