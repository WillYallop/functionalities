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
    multi: string;
    multiTargets: string;
    multiState: string;
  };
}

interface TogglerObj {
  state: boolean;
  activeClass: string;
  closeTogglers: Array<string>;
}
interface TogglerMultiObj {
  state: boolean;
  activeClass: string;
  targets: Array<string>;
}

export default class Toggler {
  config: DefaultConfig;
  map: Map<string, TogglerObj>;
  multiToggler: Map<string, TogglerMultiObj>;
  constructor(config?: Config) {
    this.config = {
      activeClass: "active",
      attributes: {
        toggler: "data-toggler",
        receiver: "data-toggler-receiver",
        class: "data-toggler-class",
        state: "data-toggler-state",
        close: "data-toggler-close",
        multi: "data-toggler-multi",
        multiTargets: "data-toggler-multi-targets",
        multiState: "data-toggler-multi-state",
      },
      ...config,
    };
    this.map = new Map();
    this.multiToggler = new Map();
    this.#initialise();
  }
  #initialise() {
    const togglers = document.querySelectorAll(
      `[${this.config.attributes.toggler}]`
    ) as NodeListOf<HTMLElement>;

    //
    const multiToggler = document.querySelectorAll(
      `[${this.config.attributes.multi}]`
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

    // for multi togglers
    [...multiToggler].map((toggler) => {
      const togglerValue = toggler.getAttribute(this.config.attributes.multi);
      if (!togglerValue) return;
      // get the targets
      const targets = toggler.getAttribute(this.config.attributes.multiTargets);
      const targetTogglerVals = targets
        ? targets.replaceAll(" ", "").split(",")
        : [];
      // set a unique instance for each toggler value into the map
      if (this.multiToggler.has(togglerValue)) return;
      this.multiToggler.set(togglerValue, {
        state:
          toggler.getAttribute(this.config.attributes.multiState) === "true",
        targets: targetTogglerVals,
        activeClass:
          toggler.getAttribute(this.config.attributes.class) ||
          this.config.activeClass,
      });
      // add event listeners to each toggler
      this.#multiClickEvent(toggler);
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

    const resetMultiTogglers = () => {
      // reset multi toggler state
      this.multiToggler.forEach((multiTogglerInstance, key) => {
        if (multiTogglerInstance.targets.includes(togglerValue)) {
          multiTogglerInstance.state = false;
          this.#updateGroup(
            document.querySelectorAll(
              `[${this.config.attributes.multi}="${key}"]`
            ) as NodeListOf<HTMLElement>,
            multiTogglerInstance,
            true
          );
        }
      });
    };

    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      // toggle state
      togglerInstance.state = !togglerInstance.state;
      // update receivers & togglers
      toggle();
      if (!togglerInstance.state) resetMultiTogglers();
    });
  }
  #multiClickEvent(toggler: HTMLElement) {
    const togglerValue = toggler.getAttribute(this.config.attributes.multi);
    if (!togglerValue) return;
    const togglerInstance = this.multiToggler.get(togglerValue);
    if (!togglerInstance) return;

    const toggle = () => {
      // update receivers & togglers
      togglerInstance.targets.map((target) => {
        const targetInstance = this.map.get(target);
        if (!targetInstance) return;
        targetInstance.state = togglerInstance.state;
        this.#updateGroup(
          document.querySelectorAll(
            `[${this.config.attributes.toggler}="${target}"]`
          ) as NodeListOf<HTMLElement>,
          targetInstance,
          true
        );
        this.#updateGroup(
          document.querySelectorAll(
            `[${this.config.attributes.receiver}="${target}"]`
          ) as NodeListOf<HTMLElement>,
          targetInstance,
          false
        );
      });
      this.#updateGroup(
        document.querySelectorAll(
          `[${this.config.attributes.multi}="${togglerValue}"]`
        ) as NodeListOf<HTMLElement>,
        togglerInstance,
        true
      );
    };
    toggle();

    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      togglerInstance.state = !togglerInstance.state;
      toggle();
    });
  }
  #updateGroup(
    group: NodeListOf<HTMLElement>,
    togglerInstance: TogglerObj | TogglerMultiObj,
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
