# Toggler - v1.1.1

Toggler is a frontend utility package that's sole purpose is to make class toggling easier. It's 100% markup/attribute based, so once the package is included, you won't have to add any further JS/TS. The two core attributes and ideas of the package are that you have both toggles and receivers. Togglers trigger all receivers and other togglers with the same value and add a class to them. Simple.

## Install

```
npm install @functionalities/toggler --save
```

## Features

- Define togglers
- Define receivers
- Optional attribute to set a custom active class
- Optional attribute to set the default toggle state 
- Option attribute to target other togglers to trigger them off
- Set multi toggler elements that toggle children togglers based on its state

## Example


```typescript
import Toggler from "@functionalities/toggler";

new Toggler();
```

```html
<button class="toggler-btn" data-toggler="button" data-toggler-state="true">
    <span class="toggler-btn__on">Active</span>
    <span class="toggler-btn__off">Not active</span>
</button>
```

> Simple example markup.

```html
<button class="toggler-btn" data-toggler="button" data-toggler-state="true" data-toggler-close="tab-1, tab-2, tab-3">
    <span class="toggler-btn__on">SHOWING TAB SECTION</span>
    <span class="toggler-btn__off">HIDING TAB SECTION</span>
</button>
<div class="toggler-btn__reciever" data-toggler-receiver="button">
    <nav class="toggler-nav">
        <ul>
            <li data-toggler="tab-1" data-toggler-state="true" data-toggler-close="tab-2, tab-3">Tab 1</li>
            <li data-toggler="tab-2" data-toggler-close="tab-1, tab-3">Tab 2</li>
            <li data-toggler="tab-3" data-toggler-close="tab-1, tab-2">Tab 3</li>
        </ul>
    </nav>
    <!-- Tab 1 -->
    <div class="toggler-tab" data-toggler-receiver="tab-1">
        <h3>Tab 1</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, nisi eget consectetur consectetur, nisi nisi, nisi nisi,
            nisi nisi.
        </p>
    </div>
    <!-- Tab 2 -->
    <div class="toggler-tab"  data-toggler-receiver="tab-2">
        <h3>Tab 2</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, nisi eget consectetur consectetur, nisi nisi, nisi nisi,
            nisi nisi.
        </p>
    </div>
    <!-- Tab 3 -->
    <div class="toggler-tab"  data-toggler-receiver="tab-3">
        <h3>Tab 3</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, nisi eget consectetur consectetur, nisi nisi, nisi nisi,
            nisi nisi.
        </p>
    </div>
</div>
```

> A more complex example, that will reveal a container that has tabs. Each tab will close the other tabs and reveal its content on a click. See the playground-fr app in the repo for the demo.

## Attribute

### data-toggler

This is the entry point attribute that you use to define a toggler (an element used to trigger a class onto a receiver). Typically this would be added to a button element. This must have a value assigned to it. Also, This value cannot have a string with a space in it.

The only functional difference between a toggler and a receiver is that a toggler has a click event attached to it and it can have the class, state and close attributes as well. If you have multiple togglers with the same value, these will just act as receivers unless they are the ones being clicked.

```html
<button data-toggler="my-toggler">Toggler</button>
```

### data-toggler-receiver

A toggler receiver has the toggler active class toggled on it when its matching data-toggler is clicked. You can have multiple receivers sharing the same value.

```html
<button data-toggler="my-toggler">Toggler</button>
<div data-toggler-receiver="my-toggler">
    Content 1
</div>
<div data-toggler-receiver="my-toggler">
    Content 2
</div>
```

### data-toggler-class

This toggler class attribute tells the package on init what active class the toggler and receivers of the same value should have toggled on and off. By default its set to ``active``. This class is applied to all togglers and all receivers with the same value.


```html
<button class="custom-active-class" data-toggler="my-toggler" data-toggler-class="custom-active-class">Toggler</button>
<div class="custom-active-class" data-toggler-receiver="my-toggler">
    content
</div>
```

### data-toggler-state

The toggler state attribute tells the package on init what the default state of the toggler should be. By default, it is set to false.

```html
<style>
.toggler-content {
    display: none;
}
.toggler-content.active {
    display: block;
}
</style>

<button class="active" data-toggler="my-toggler" data-toggler-state="true">Toggler</button>
<div class="toggler-content active" data-toggler-receiver="my-toggler">
    content
</div>
```

> In this example, the content would be visible on load.

### data-toggler-close

This is one of the more powerful attributes. If you set this on a toggler, all other togglers with the values specified in this attribute will be toggled off on click.

```html
<button data-toggler="tab-1" data-toggler-close="tab-2, tab-3">Tab 1</button>
<button data-toggler="tab-2" data-toggler-close="tab-1, tab-3">Tab 2</button>
<button data-toggler="tab-3" data-toggler-close="tab-1, tab-2">Tab 3</button>

<div data-toggler-receiver="tab-1">Tab 1 content</div>
<div data-toggler-receiver="tab-2">Tab 2 content</div>
<div data-toggler-receiver="tab-3">Tab 3 content</div>
```

### data-toggler-multi

This is a standalone attribute that can be used to toggle multiple unique toggles based on its own state.

```html
<ul>
    <li
        data-toggler-multi="all-tabs"
        data-toggler-multi-targets="tab-1, tab-2, tab-3"
        data-toggler-multi-state="true"
    >
        All
    </li>
    <li data-toggler="tab-1">
        Tab 1
    </li>
    <li data-toggler="tab-2">
        Tab 2
    </li>
    <li data-toggler="tab-3">
        Tab 3
    </li>
</ul>
```

> If the muli-target toggle has the data-toggler-close value it will still work, however on clicking the toggler with the data-toggler-close value there may be some quirkiness involved. Though these likely will never need to be used together.

### data-toggler-multi-targets

This has to be used with the ``data-toggler-multi`` attribute and is used to tell it which ``data-toggler``'s it should toggle. Make sure the format matches the example below.

```html
<li
    data-toggler-multi="all-tabs"
    data-toggler-multi-targets="tab-1, tab-2, tab-3"
>
    All
</li>
```

### data-toggler-multi-state

This sets the default state of the ``data-toggler-multi`` element. Having this set to true means all of its target togglers will be automatically set to true regardless if the toggler itself has the default state of true or false. By default this is false.

```html
<li
    data-toggler-multi="all-tabs"
    data-toggler-multi-state="true"
>
    All
</li>
```

## Config

```typescript
new Toggler({
    activeClass: 'active' // string
});
```

### activeClass

Sets the default active class for all togglers.

## Future
 
- Ability to trigger functions 