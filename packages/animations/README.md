# Animations - v1.0.1

Animations is a frontend animation utility package. It doesn't have any animations included, but it uses an intersection observer at its core to trigger classes on defined elements when they reach a certain threshold in the viewport. It's entirely up to the user to implement animations themself through CSS.

## Install

```
npm install @functionalities/animations --save
```

## Example

Animations is lightweight and doesn't require much to get it up and running. Simply import the package and create a new instance of it. To define animation classes for elements, all you need to do is add the `data-animation` attribute markup in your HTML.

```typescript
import Animations from "@functionalities/animations";

new Animations();
```

```html
<div
  data-animate="[
    {
        'class': 'show-me'
    },
    {
        'class': 'turn-red',
        'delay': 1000,
        'reset': false
    }
]"
>
  <h3>Hello there</h3>
</div>
```

> This above example will add the "show-me" class when it first enters the viewport, then 1000ms later add the class "turn-red". The "turn-red" class won't be removed when the element leaves the viewport due to the reset value being false.

## Config

```typescript
new Animations({
  activeClass: "animate", // string
  reset: true, // boolean
  threshold: 1, // number
});
```

### activeClass

Regardless of the values of `data-animate`, this default class will always get added to the element when its visible.

### reset

This defines the default behaviour for if `data-animate` elements should have their classes removed when they exit the viewport. The re4set value in the in `data-animate` objects will override this for them specifically.

### threshold

Determines the threshold for the intersection observer. 1 means the whole element must be visible before toggling the classes.

```html
data-animate="[ { 'class': 'turn-red', 'delay': 1000, 'reset': false } ]"
```

### class

This is the class that is added and removed when the element enters and leaves the viewport.

### delay

In milliseconds, this is the delay for triggering the class on. This delay isnt used for removing the class.

### reset

Overriding the Animations class instance reset value for this specific class. Will tell the package if the class should be removed when it exits the viewport.

## Notes

- The JSON markup in the `data-animate` attribute has to be valid JSON, minus the use of `'` instead of `"`.
