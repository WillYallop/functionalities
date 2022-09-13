interface configParam {
  idPrefix?: string;
  activeClass?: string;
  targetAttribute?: string;
  duration?: number;
  defaultState?: boolean;
  closeAll?: boolean;
}
interface config {
  idPrefix: string;
  activeClass: string;
  targetAttribute: string;
  duration: number;
  defaultState: boolean;
  closeAll: boolean;
}

interface disclosureObj {
  index: number;
  state: boolean;
  region: HTMLElement;
  regionScrollHeight: number;
  togglers: NodeListOf<HTMLElement>;
}
type disclosures = Map<HTMLElement, disclosureObj>;

export default class Disclosure {
  attributes = {
    container: "container",
    region: "region",
    toggle: "toggle",
  };
  disclosures: disclosures;
  config: config;
  constructor(config?: configParam) {
    // create a weak map to store all disclosures elements with a data-disclosure attribute of attribute.container
    this.disclosures = new Map();

    const defaultConfig = {
      idPrefix: "disclosure_",
      activeClass: "disclosure-active",
      targetAttribute: "data-disclosure",
      duration: 200,
      defaultState: false,
      closeAll: true,
    };
    this.config = { ...defaultConfig, ...config };

    this.#init();
  }
  #init() {
    const disclosures = document.querySelectorAll(
      `[${this.config.targetAttribute}="${this.attributes.container}"]`
    ) as NodeListOf<HTMLElement>;

    disclosures.forEach((disclosure, index) => {
      // set default state if specified on ele
      let state = this.config.defaultState;
      // check if the disclosure has an attribute data-disclosure-state
      if (disclosure.hasAttribute(`${this.config.targetAttribute}-state`)) {
        state =
          disclosure.getAttribute(`${this.config.targetAttribute}-state`) ===
          "true";
      }
      // add to map
      this.disclosures.set(disclosure, {
        index: index,
        state: state,
        region: disclosure.querySelector(
          `[${this.config.targetAttribute}="${this.attributes.region}"]`
        ) as HTMLElement,
        regionScrollHeight: 0,
        togglers: disclosure.querySelectorAll(
          `[${this.config.targetAttribute}="${this.attributes.toggle}"]`
        ) as NodeListOf<HTMLElement>,
      });
      // preflight
      this.#preflight(disclosure);
    });
  }

  #preflight(ele: HTMLElement) {
    const disclosure = this.disclosures.get(ele);
    if (!disclosure) return;

    // set initial classes and attributes
    this.#toggleEle(ele, disclosure.state, false);
    this.#toggleTogglers(disclosure);
    this.#toggleEle(disclosure.region, disclosure.state, true);

    // add defaults to region
    disclosure.region.style.transition = `max-height ${this.config.duration}ms ease-in-out`;
    disclosure.region.style.overflow = "hidden";
    disclosure.region.setAttribute("role", "region");
    disclosure.region.setAttribute(
      "id",
      `${this.config.idPrefix}region-${disclosure.index}`
    );

    // for each toggler, add click event listener and defaults
    disclosure.togglers.forEach((toggler, index) => {
      // add defaults to togglers
      toggler.setAttribute("role", "button");
      toggler.setAttribute("aria-controls", disclosure.region.id);
      toggler.setAttribute(
        "id",
        `${this.config.idPrefix}toggler-${disclosure.index}-${index}`
      );
      if (index === 0) {
        disclosure.region.setAttribute(
          "aria-labelledby",
          disclosure.togglers[0].id
        );
      }

      // toggle event listener
      toggler.addEventListener("click", (e) => {
        e.preventDefault();
        this.#trigger(ele);
      });
      // add an event listen to toggle on spacebar press and enter press
      toggler.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          this.#trigger(ele);
        }
      });
    });
  }

  // trigger parent
  #trigger(ele: HTMLElement) {
    const disclosure = this.disclosures.get(ele);
    if (!disclosure) return;
    disclosure.state = !disclosure.state;

    // if closeAll is true and new state on toggled element is true, close all open modals
    if (this.config.closeAll && disclosure.state) {
      for (let [key, value] of this.disclosures.entries()) {
        if (key !== ele) {
          value.state = false;
          this.#toggleEle(key, value.state, false);
          this.#toggleTogglers(value);
          this.#toggleEle(value.region, value.state, true);
        }
      }
    }

    this.#toggleEle(ele, disclosure.state, false);
    this.#toggleTogglers(disclosure);
    this.#toggleEle(disclosure.region, disclosure.state, true);
  }
  // trigger elements
  #toggleEle(ele: HTMLElement, state: boolean, region: boolean) {
    if (state) {
      ele.classList.add(this.config.activeClass);
      if (region) {
        ele.style.maxHeight = ele.scrollHeight + "px";
      }
    } else {
      ele.classList.remove(this.config.activeClass);
      if (region) {
        ele.style.maxHeight = "0px";
      }
    }
  }
  // trigger togglers
  #toggleTogglers(disclosure: disclosureObj) {
    disclosure.togglers.forEach((toggler) => {
      if (disclosure.state) {
        toggler.classList.add(this.config.activeClass);
        toggler.setAttribute("aria-expanded", "true");
      } else {
        toggler.classList.remove(this.config.activeClass);
        toggler.setAttribute("aria-expanded", "false");
      }
    });
  }
}
