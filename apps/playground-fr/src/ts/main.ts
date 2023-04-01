import Toggler from "@functionalities/toggler";
import Animations from "@functionalities/animations";
import {
  EnhancedDetails,
  DetailDisclosure,
  StickyHeader,
  CheckboxToggler,
  Carousel,
} from "@functionalities/webcomponents";

customElements.define("enhanced-details", EnhancedDetails);
customElements.define("detail-disclosure", DetailDisclosure);
customElements.define("sticky-header", StickyHeader);
customElements.define("checkbox-toggler", CheckboxToggler);

customElements.define("carousel-container", Carousel.Container);
customElements.define("carousel-track", Carousel.Track);
customElements.define("carousel-slide", Carousel.Slide);
customElements.define("carousel-controls", Carousel.Controls);
customElements.define("carousel-pagination", Carousel.Pagination);

// @ts-ignore
window.windowOnScroll = (data) => {
  //   console.log(data);
};

// @ts-ignore
window.windowOnChange = (data) => {
  //   console.log(data);
};

// Toggler
new Toggler({
  activeClass: "active",
  functions: {
    updateDonkeys: (instance, ele) => {
      console.log("updateDonkeys", instance, ele);
    },
  },
});

// Animations
new Animations({
  activeClass: "animate",
  reset: true,
  threshold: 1,
});
