# Sticky Header - v1.1.3 (Discontinued)

> This package is discontinued. An improved sticky header can be found in the [webcomponents library](https://www.npmjs.com/package/@functionalities/webcomponents).

Sticky header is a small frontend utility package for implementing a sticky header. It has three states for being at the top of the page, scrolling down and scrolling up, each of which will add a unique class allowing you to style it however you like.

## Install

```
npm install @functionalities/stickyheader --save
```

## Features

- Adds one of 3 configurable classes depending on scroll state.
- Has a callback function that fires on state change.
- Has a callback function that fires on window scroll.
- Scroll event listener can be removed.

## Example

Using functionalities sticky header couldn't be easier. Simply import the package in your code, and add a header that has an ID.

```typescript
import StickyHeader from "@functionalities/stickyheader";

new StickyHeader("siteHeader");
```

> The constructor can have config passed to it - see below for examples.

```html
<header id="siteHeader">
  <h1>Header Example</h1>
</header>
```

> Example markup.

## Config

Below is the default config for a new disclosure instance.

```typescript
new StickyHeader("siteHeader", {
  // string
  triggerDistance: 50, // number
  classes: {
    top: "sticky-top", // string
    movedDown: "sticky-down", // string
    movedUp: "sticky-up", // string
  },
  onChange: undefined, // (response: { state: string; scrollPos: number }) => void;
  onScroll: undefined, // (response: { state: string; scrollPos: number }) => void;
});
```

### triggerDistance

This is an offset value that tells the package at what distance from the top of the page, should it start updating the state. By default, this is 50 which seems to be a sweet spot. But experiment as you please.

### classes.top

This is the class used to represent the header being at the top of the page. This is applied when the header's top distance is less than the triggerDistance value.

### classes.movedDown

This is the class used to represent if the user's last scroll action was down.

### classes.movedUp

This is the class used to represent if the user's last scroll action was up.

### onChange

This is a callback function that is triggered in the package when the header changes state between being at the top, movedDown and movedUp. It returns an object with the state (as the class name) and the scrollPos which is the viewport distance from the top of the page.

```typescript
{
    state: 'sticky-top',
    scrollPos: 100
}
```

### onScroll

This is a callback function that is triggered when the window is scrolled. It will include the current header state and the scrollPos in the same format as the onChange callback.

```typescript
{
    state: 'sticky-top',
    scrollPos: 100
}
```

## Notes

- If you wish to only have a top and scroll state, you could just apply the same styles to the classes.movedDown and classes.movedUp classes to represent the scroll-down state.
