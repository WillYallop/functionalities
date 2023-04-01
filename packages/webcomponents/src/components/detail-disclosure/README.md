# Detail Disclosure

The Detail Disclosure web component is an extension of the details/summary elements with additional options to assign groups to disclosures so that only one is open at a time, and to animate the height of the content when toggled. This component is built to progressively enhance the ``<details>`` element and provides accessibility attributes even when JavaScript is disabled.

## Quick Links

- [Features](#features)
- [Getting Started](#getting-started)
- [Attributes](#attributes)
- [Future Development](#future-development)

## Features
- Progressivly enhanced ``<details>``.
- Define groups to allow one to disclosure of that group to be open at a time.
- Animated height.
- Has appropriate aria attributes.
- Optional ``duration`` attribtue to change animation speed.

## Getting Started

To use the Detail Disclosure component, import it and define it as a custom element:

```typescript
import { DetailDisclosure } from "@functionalities/webcomponents";

customElements.define("detail-disclosure", DetailDisclosure);
```

Once defined, you can use the detail-disclosure custom element in your HTML markup to wrap a ``<details>`` element with a ``<summary>`` element and a content element.

```html
<detail-disclosure group="group-1" duration="200">
    <details open>
        <summary>Question 1</summary>
        <div>
            Answer: Duis id culpa Lorem amet tempor est elit est sunt.
            Veniam eiusmod proident aute sit fugiat mollit nisi et consequat
            amet laborum Lorem et occaecat. Aute incididunt minim elit amet
            exercitation sit cupidatat voluptate ipsum ex sint esse.
        </div>
    </details>
</detail-disclosure>
```

> This web component requires the ``<details>``, ``<summary>`` and a content element to work!

## Attributes

The Detail Disclosure component supports the following attributes:

### group

The group attribute is used to group multiple Detail Disclosure elements together. When multiple elements belong to the same group, only one element can be open at a time within the group. If you want multiple instances of this element to belong to the same group, set the same attribute value to them all.

```html
<detail-disclosure group="group-1">
    <details>
        <summary>Question 1</summary>
        <div>Answer 1</div>
    </details>
</detail-disclosure>

<detail-disclosure group="group-1">
    <details>
        <summary>Question 2</summary>
        <div>Answer 2</div>
    </details>
</detail-disclosure>

```

### duration

The duration attribute controls how long the animation runs for when the disclosure is toggled. This attribute is observed, which means that if you wish to update it programmatically, you can do so, and the changes will take place immediately.

> By default this is set to 200ms

### open

See the [details](#details) component to see how the open attribute works.

## Future Development
- Allow for nested disclosures
- Add optional attributes for buttons to trigger the closing the disclosure