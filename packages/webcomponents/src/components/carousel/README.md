# Carousel

The Carousel web component is a progressive enhancement to the CSS scroll-snap feature. It creates an accessible, feature-rich carousel with autoplay, touch controls, play and pause, navigation buttons, and pagination. What's best is that, because it uses CSS scroll-snap, if JS is disabled, the content of the slides is still visible and functional.

## Quick Links

- [Features](#features)
- [Getting Started](#getting-started)
- [Attributes](#attributes)
- [Notes](#notes)
- [Future Development](#future-development)

## Features
- Fully accessible!
- Works without JS enabled.
- Works both vertically and horizontally.
- Touch controls.
- Autoplay with custom duration.
- Pagination.
- Navigation controls.

## Getting Started

To use the Carousel, there are a handful of components you will need to import and define as custom elements:

- [JS/TS](#jsts)
- [HTML](#html)
- [CSS](#css)

### JS/TS

```typescript
import { Carousel } from "@functionalities/webcomponents";

customElements.define("carousel-container", Carousel.Container);
customElements.define("carousel-track", Carousel.Track);
customElements.define("carousel-slide", Carousel.Slide);
customElements.define("carousel-controls", Carousel.Controls); // OPTIONAL
customElements.define("carousel-pagination", Carousel.Pagination); // OPTIONAL
```
### HTML

Then, use it in your HTML:

```html
<carousel-container autoplay="true" duration="2000">
    <carousel-track>
        <carousel-slide id="slide-0-1">Slide one</carousel-slide>
        <carousel-slide id="slide-0-2">Slide two</carousel-slide>
        <carousel-slide id="slide-0-3">Slide three</carousel-slide>
        <carousel-slide id="slide-0-4">Slide four</carousel-slide>
    </carousel-track>
    <carousel-pagination></carousel-pagination>
    <carousel-controls></carousel-controls>

    <noscript>
        <nav aria-label="Carousel Pagination">
            <ul>
                <li><a href="#slide-0-1" aria-label="Go to slide one">Slide 1</a></li>
                <li><a href="#slide-0-2" aria-label="Go to slide two">Slide 2</a></li>
                <li><a href="#slide-0-3" aria-label="Go to slide three">Slide 3</a></li>
                <li><a href="#slide-0-4" aria-label="Go to slide four">Slide 4</a></li>
            </ul>
        </nav>
    </noscript>
</carousel-container>
```

> Its recommended you provide ID's to the slide component so you can use the same value in you noscript pagination links.

### CSS

Though not stictly a requirement, its highly recommended you use the CSS scroll-snap feature. Here is the minimum CSS you will want to add:

**For horizontal sliders**

```css
carousel-track {
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overflow: auto;
  display: flex;
}
carousel-slide {
  scroll-snap-align: start;
  flex: 0 0 100%;
}
```

**For vertical sliders**

```css
carousel-track {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
carousel-slide {
    scroll-snap-align: start;
    flex: 0 0 100%;
}
```

## Attributes

### autoplay

Determines whether the carousel will play automatically.

### duration

The time it takes in ms to go to the next slide.

## Notes

### carousel-container

- All other components must be direct children of this component.
- This is the component that contains the autoplay and duration attributes.

### carousel-track

- This component may only contain ``carousel-slide`` components.
- When focused or hovering over, the autoplay will pause.

### carousel-slide

- While an ID is generated on this component if one isnt present, its reccomended you add you own. This way you can easily target the slide with anchor elements with the ID as the href - this is crucial for non JS pagination.

### carousel-controls

- This is optional.
- The play/pause button has the class ``paused`` added to it whenever the carousel is paused.
- If you dont wish to have the play/pause feature, just hide the button in CSS.
- If you dont want the SVG icons, use CSS to hide them and update the content.

### carousel-pagination

- This is optional.
- Supports arrow navigation.
- Only the active one is tabbable.

## Future Development

- Support right to left auto slide direction.