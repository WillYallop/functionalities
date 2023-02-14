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
    targets: string;
  };
}

interface TogglerObj {
  state: boolean;
  activeClass: string;
  closeTogglers: Array<string>;
  targets: Array<string>;
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
        targets: "data-toggler-targets",
      },
      ...config,
    };
    this.map = new Map();
    this.#initialise();
  }
  // ----------------- PRIVATE METHODS ----------------- //
  #initialise() {
    const togglers = document.querySelectorAll(
      `[${this.config.attributes.toggler}]`
    ) as NodeListOf<HTMLElement>;

    // for each toggler, add event listener and register unique ones in the map
    [...togglers].map((toggler) => {
      const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
      if (!togglerValue) return;

      // get the targets
      const targets = toggler.getAttribute(this.config.attributes.targets);
      const targetTogglerVals = targets
        ? targets.replaceAll(" ", "").split(",")
        : [];

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
        targets: targetTogglerVals,
      });

      // add event listeners to each toggler
      if (targetTogglerVals.length > 0) this.#multiClickEvent(toggler);
      else this.#clickEvent(toggler);
    });

    // once complete, do initial toggle on data-toggler-targets type
    this.map.forEach((togglerInstance, key) => {
      if (togglerInstance.targets.length > 0) {
        if (togglerInstance.state) this.#multiToggle(togglerInstance, key);
      }
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

    // update parent multi toggler state
    const updateMultiToggle = () => {
      // reset multi toggler state
      this.map.forEach((multiTogglerInstance, key) => {
        // if the current toggler is being set to false, find and update the multi toggler
        if (!togglerInstance.state) {
          if (multiTogglerInstance.targets.includes(togglerValue)) {
            multiTogglerInstance.state = false;
            this.#updateGroup(
              document.querySelectorAll(
                `[${this.config.attributes.toggler}="${key}"]`
              ) as NodeListOf<HTMLElement>,
              multiTogglerInstance,
              true
            );
          }
        } else {
          // if the current toggler is being set to true, find and update the multi toggler
          if (multiTogglerInstance.targets.includes(togglerValue)) {
            // if all targets are true, set the multi toggler to true
            const allTrue = multiTogglerInstance.targets.every((target) => {
              const targetInstance = this.map.get(target);
              if (!targetInstance) return false;
              return targetInstance.state;
            });
            if (allTrue) {
              multiTogglerInstance.state = true;
              this.#updateGroup(
                document.querySelectorAll(
                  `[${this.config.attributes.toggler}="${key}"]`
                ) as NodeListOf<HTMLElement>,
                multiTogglerInstance,
                true
              );
            }
          }
        }
      });
    };

    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      // toggle state
      togglerInstance.state = !togglerInstance.state;
      // update receivers & togglers
      toggle();
      updateMultiToggle();
    });
  }
  #multiClickEvent(toggler: HTMLElement) {
    const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
    if (!togglerValue) return;
    const togglerInstance = this.map.get(togglerValue);
    if (!togglerInstance) return;
    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      togglerInstance.state = !togglerInstance.state;
      this.#multiToggle(togglerInstance, togglerValue);
    });
  }
  #multiToggle(toggler: TogglerObj, parentToggle: string) {
    // update receivers & togglers
    toggler.targets.map((target) => {
      const targetInstance = this.map.get(target);
      if (!targetInstance) return;
      targetInstance.state = toggler.state;
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
        `[${this.config.attributes.toggler}="${parentToggle}"]`
      ) as NodeListOf<HTMLElement>,
      toggler,
      true
    );
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
  // ------------------ PUBLIC METHODS ------------------ //

  public toggle(toggler: string, state?: boolean) {
    const togglerInstance = this.map.get(toggler);
    if (!togglerInstance) return;
    const newState = state === undefined ? !togglerInstance.state : state;
    if (togglerInstance.targets.length > 0) {
      togglerInstance.state = newState;
      this.#multiToggle(togglerInstance, toggler);
    } else {
      togglerInstance.state = newState;
      this.#updateGroup(
        document.querySelectorAll(
          `[${this.config.attributes.toggler}="${toggler}"]`
        ) as NodeListOf<HTMLElement>,
        togglerInstance,
        true
      );
      this.#updateGroup(
        document.querySelectorAll(
          `[${this.config.attributes.receiver}="${toggler}"]`
        ) as NodeListOf<HTMLElement>,
        togglerInstance,
        false
      );
    }
  }
}
