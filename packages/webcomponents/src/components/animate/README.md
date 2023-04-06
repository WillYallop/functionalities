# Animate

A simple web component for triggering CSS animations. Designed to retain basic functionality when JS is disabled.

## Quick Links

- [Features](#features)
- [Getting Started](#getting-started)
- [Attributes](#attributes)
- [Future Development](#future-development)

## Features

- CSS animations only so works without JS.
- Supports animate on visible.
- Supports animate on load.
- You can delay the animation.

## Getting Started

To use the Animate component, import it and define it as a custom element:

```typescript
import { Animate } from "@functionalities/webcomponents";

customElements.define("animate-container", Animate);
```

### HTML

```html
<animate-container
  animate="true"
  on="visible"
  reset="true"
  delay="200"
  type="fade-in"
>
  Elit laboris amet deserunt ad non quis anim elit ex Lorem culpa. Id labore id
  nostrud deserunt elit id labore sint do. Incididunt labore fugiat excepteur
  culpa fugiat qui ipsum voluptate proident proident ullamco do.
</animate-container>
```

> Adding the animate="true" attribute

### CSS (scss)

```scss
// --------------------------------
// Animation styles
animate-container {
  animation-delay: 0s;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  backface-visibility: hidden;
  // Default DIV styles
  display: block;
  position: relative;

  // Animate
  &[animate="true"] {
    // fade-in
    &[type="fade-in"] {
      animation-name: fade-in;
      @media (prefers-reduced-motion: reduce) {
        animation-name: fade-in-reduced;
      }
    }
    // ADD MORE ANIMATIONS HERE
  }

  // Default
  &[animate="false"] {
    // fade-in
    &[type="fade-in"] {
      opacity: 0;
      transform: translate3d(0, 10px, 0);
      @media (prefers-reduced-motion: reduce) {
        transform: translate3d(0, 0, 0);
      }
    }
    // ADD MORE ANIMATIONS HERE
  }
}

// --------------------------------
// Keyframes
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fade-in-reduced {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

## Attributes

The Animate component supports the attributes bellow. Note that if you have not set the values in markup, on load the element will add the default values to the element.

### animate

This attribute is toggled between true and false depending on the animation state of the element. This value should be used in CSS to trigger the animation.

> You should add animate="true" to the Animate webcomponent element regarless of the on value so that in the case JS is disabled, the CSS animation can still trigger. With JS enabled, the second the element is initialised, this attribute is set to false so the JS can trigger the animation accoridng to the on value as usual.

### on

This can take two values:

- load
- visible (default)

`load` means that the animate attribute will get set to true the moment the elemen is initialised and `visible` will set the animate attribute to true when the element enters the viewport.

### type

This is the name of the animation you wish to use. This can be any value, but by default is is `fade-in`. Whatever value you set this attribtue to. You should use it in your CSS to make sure the correct animation triggers. See the [CSS (scss) section](#css-scss).

### delay

This set the `animation-delay` style value on the element.

### threshhold

If you have the on attribute set to `visible`, then this threshhold is used to determine how much of the element should be visible before triggering the animate state.

### reset

If you have the on attribtue set to `visible`, this value allows the animate state to reset when the element goes out of the viewport once again.

## Future Development

-
