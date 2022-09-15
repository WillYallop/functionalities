// Types
interface Config {
  activeClass?: string;
}
interface DefaultConfig {
  activeClass: string;
  attributes: {
    toggler: string;
    receiver: string;
    class: string;
    state: string;
    close: string;
  };
}

interface TogglerObj {
  state: boolean;
  activeClass: string;
  closeTogglers: Array<string>;
}

export default class Toggler {
  config: DefaultConfig;
  map: Map<string, TogglerObj>;
  constructor(config?: Config) {
    this.config = {
      activeClass: "active",
      attributes: {
        toggler: "data-toggler",
        receiver: "data-toggler-receiver",
        class: "data-toggler-class",
        state: "data-toggler-state",
        close: "data-toggler-close",
      },
      ...config,
    };
    this.map = new Map();
    this.#initialise();
  }
  #initialise() {
    const togglers = document.querySelectorAll(
      `[${this.config.attributes.toggler}]`
    ) as NodeListOf<HTMLElement>;

    // for each toggler, add event listener and register unique ones in the map
    [...togglers].map((toggler) => {
      const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
      if (!togglerValue) return;

      // get togglers close attribute
      const closeTogglers = toggler.getAttribute(this.config.attributes.close);
      const closeTogglersArray = closeTogglers
        ? closeTogglers.replaceAll(" ", "").split(",")
        : [];

      // set a unique instance for each toggler value into the map
      if (this.map.has(togglerValue)) return;
      this.map.set(togglerValue, {
        state:
          toggler.getAttribute(this.config.attributes.state) === "true"
            ? true
            : false,
        activeClass:
          toggler.getAttribute(this.config.attributes.class) ||
          this.config.activeClass,
        closeTogglers: closeTogglersArray,
      });

      // add event listeners to each toggler
      this.#clickEvent(toggler);
    });
  }
  #clickEvent(toggler: HTMLElement) {
    const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
    if (!togglerValue) return;
    const togglerInstance = this.map.get(togglerValue);
    if (!togglerInstance) return;

    const toggle = () => {
      // update receivers & togglers
      this.#updateGroup(
        document.querySelectorAll(
          `[${this.config.attributes.receiver}="${togglerValue}"]`
        ) as NodeListOf<HTMLElement>,
        togglerInstance,
        false
      );
      this.#updateGroup(
        document.querySelectorAll(
          `[${this.config.attributes.toggler}="${togglerValue}"]`
        ) as NodeListOf<HTMLElement>,
        togglerInstance,
        true
      );
      // for closeTogglers in the map, set state to false
      togglerInstance.closeTogglers.map((closeToggler) => {
        const closeTogglerInstance = this.map.get(closeToggler);
        if (!closeTogglerInstance) return;
        closeTogglerInstance.state = false;
        this.#updateGroup(
          document.querySelectorAll(
            `[${this.config.attributes.toggler}="${closeToggler}"]`
          ) as NodeListOf<HTMLElement>,
          closeTogglerInstance,
          true
        );
        this.#updateGroup(
          document.querySelectorAll(
            `[${this.config.attributes.receiver}="${closeToggler}"]`
          ) as NodeListOf<HTMLElement>,
          closeTogglerInstance,
          false
        );
      });
    };
    toggle();

    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      // toggle state
      togglerInstance.state = !togglerInstance.state;
      // update receivers & togglers
      toggle();
    });
  }
  #updateGroup(
    group: NodeListOf<HTMLElement>,
    togglerInstance: TogglerObj,
    aria: boolean
  ) {
    [...group].map((receiver) => {
      if (togglerInstance.state) {
        receiver.classList.add(togglerInstance.activeClass);
        if (aria) receiver.setAttribute("aria-expanded", "true");
      } else {
        receiver.classList.remove(togglerInstance.activeClass);
        if (aria) receiver.setAttribute("aria-expanded", "false");
      }
    });
  }
}
