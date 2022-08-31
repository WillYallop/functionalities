# Disclosure - v1.0.0

Disclosure is a minimal frontend package for implementing accessible, lightweight disclosure components.

---

## Install

```
npm install @functionalities/disclosure --save
```

---

## Example

Using functionalities disclousre couldnt be easier. Simply import the package in your code, and add your disclosure markup.

```typescript
import Disclosure from "@functionalities/disclosure";

new Disclosure();
```

> The constructor can have config passed to it - see bellow for examples.

An exmaple of a single disclousre row, these can be repeated as many times as you like. Dont worry about adding accessibility attributes to any of these elements as this package will handle that for you. You may also add as many `data-disclosure="toggle"` as you like (as long as its within the container).

```html
<div data-disclosure="container" data-disclosure-state="true">
  <button data-disclosure="toggle">Toggle me</button>
  <div data-disclosure="region">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod,
      nisi eget consectetur consectetur, nisi nisi, nisi nisi, nisi nisi.
    </p>
  </div>
</div>
```

> The `data-disclosure-state` attribute if not present will default to false.

---

## Config

Bellow is the default config for a new disclosure instance.

```typescript
new Disclosure({
  idPrefix: "disclosure_", // string
  activeClass: "disclosure-active", // string
  targetAttribute: "data-disclosure", // string
  duration: 200, // number in ms
  defaultState: false, // boolean
});
```

### idPrefix

A string prefix that is added before the generated ids for the disclosure region and togglers. If you have multiple instances of this class, make sure to add a unique prefix!

### activeClass

The active class added to the disclosure container, toggle and region.

### targetAttribute

The attribute we use to determine what disclosures to initialise. If you want multiple instances of the class, make sure to add a unique targetAttribute so there are no conflict and you can set unique config.

### duration

The duration of the CSS transition in ms.

### defaultState

The default state of all initialised disclosures. True means they will all be open by default, false means they will be closed.

---

## Limitations

When resizing the browser, open disclosures wont have their max-height readjusted. This is on purpose as to not introduce any resize event listeners which can have performance impacts. This limitation is unlikely to be an issue as resizing a browser isnt a typical user action, if this action is taken though, simply toggling the disclosure again will fix it.
