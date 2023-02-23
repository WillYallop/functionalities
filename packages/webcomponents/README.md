# Web Components - v0.1.1

The Web Components library, provides easy-to-use and simple solutions for common website features. The library aims to enhance browser elements progressively to ensure that the components function properly, even with JavaScript disabled.

## Install

```
npm install @functionalities/webcomponents --save
```

## Components

- [Details](#details)
- [Disclosure](#disclosure)
- [Sticky Header](#sticky-header) (Coming Soon)
- [Carousel](#carousel) (Coming Soon)

## Details

The Details component is an enhanced version of the ``<details>`` element that adds accessibility attributes, an animation trigger for the content, and the option to close the detail on focusout. The Details component retains the functionality of the ``<details>`` element, even with JavaScript disabled.

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

### Attributes

The Details component supports the following attributes:

#### close-on-leave

If set to ``"true"``, the details will close when the focus leaves the web component. If this functionality is not desired, the attribute can be omitted or set to false.

#### open

Setting the open attribute on the ``<functionalities-details>`` element will set the ``<details>`` element to open by default. If set or removed programmatically, it will update the ``<details>`` element below. 

> If you want it open by default, it is better practice to put the open attribute on the ``<details>`` element. When the ``<functionalities-details>`` is initiated, it will see this and set the open attribute on itself. This way, if JavaScript is disabled, it will still have the same default state.

## Disclosure

The Disclosure web component is an extension of the Details component with additional options to assign groups to disclosures so that only one is open at a time, and to animate the height of the content when toggled. This component is built to progressively enhance the ``<details>`` element and provides accessibility attributes even when JavaScript is disabled.

To use the Disclosure component, import it and define it as a custom element:

```typescript
import { Disclosure } from "@functionalities/webcomponents";

customElements.define("functionalities-disclosure", Disclosure);
```

Once defined, you can use the functionalities-disclosure custom element in your HTML markup to wrap a ``<details>`` element with a ``<summary>`` element and a content element.

```html
<functionalities-disclosure group="group-1" duration="200">
    <details open>
        <summary>Question 1</summary>
        <div>
            Answer: Duis id culpa Lorem amet tempor est elit est sunt.
            Veniam eiusmod proident aute sit fugiat mollit nisi et consequat
            amet laborum Lorem et occaecat. Aute incididunt minim elit amet
            exercitation sit cupidatat voluptate ipsum ex sint esse.
        </div>
    </details>
</functionalities-disclosure>
```

> This web component requires the ``<details>``, ``<summary>`` and a content element to work!

### Attributes

The Disclosure component supports the following attributes:

#### group

The group attribute is used to group multiple Disclosure elements together. When multiple elements belong to the same group, only one element can be open at a time within the group. If you want multiple instances of this element to belong to the same group, set the same attribute value to them all.

```html
<functionalities-disclosure group="group-1">
    <details>
        <summary>Question 1</summary>
        <div>Answer 1</div>
    </details>
</functionalities-disclosure>

<functionalities-disclosure group="group-1">
    <details>
        <summary>Question 2</summary>
        <div>Answer 2</div>
    </details>
</functionalities-disclosure>

```

#### duration

The duration attribute controls how long the animation runs for when the disclosure is toggled. This attribute is observed, which means that if you wish to update it programmatically, you can do so, and the changes will take place immediately.

> By default this is set to 200ms

#### open

See the [details](#details) component to see how the open attribute works.

## Sticky Header

The ``<functionalities-sticky-header>`` component is a work in progress.

## Carousel

The ``<functionalities-carousel>`` component is a work in progress, but will support a non JS fallback through the use of the CSS scroll-snap feature.