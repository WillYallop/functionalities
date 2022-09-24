export default class Toggler {
    config;
    map;
    constructor(config) {
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
    #initialise() {
        const togglers = document.querySelectorAll(`[${this.config.attributes.toggler}]`);
        [...togglers].map((toggler) => {
            const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
            if (!togglerValue)
                return;
            const targets = toggler.getAttribute(this.config.attributes.targets);
            const targetTogglerVals = targets
                ? targets.replaceAll(" ", "").split(",")
                : [];
            const closeTogglers = toggler.getAttribute(this.config.attributes.close);
            const closeTogglersArray = closeTogglers
                ? closeTogglers.replaceAll(" ", "").split(",")
                : [];
            if (this.map.has(togglerValue))
                return;
            this.map.set(togglerValue, {
                state: toggler.getAttribute(this.config.attributes.state) === "true"
                    ? true
                    : false,
                activeClass: toggler.getAttribute(this.config.attributes.class) ||
                    this.config.activeClass,
                closeTogglers: closeTogglersArray,
                targets: targetTogglerVals,
            });
            if (targetTogglerVals.length > 0)
                this.#multiClickEvent(toggler);
            else
                this.#clickEvent(toggler);
        });
        this.map.forEach((togglerInstance, key) => {
            if (togglerInstance.targets.length > 0) {
                if (togglerInstance.state)
                    this.#multiToggle(togglerInstance, key);
            }
        });
    }
    #clickEvent(toggler) {
        const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
        if (!togglerValue)
            return;
        const togglerInstance = this.map.get(togglerValue);
        if (!togglerInstance)
            return;
        const toggle = () => {
            this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.receiver}="${togglerValue}"]`), togglerInstance, false);
            this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.toggler}="${togglerValue}"]`), togglerInstance, true);
            togglerInstance.closeTogglers.map((closeToggler) => {
                const closeTogglerInstance = this.map.get(closeToggler);
                if (!closeTogglerInstance)
                    return;
                closeTogglerInstance.state = false;
                this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.toggler}="${closeToggler}"]`), closeTogglerInstance, true);
                this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.receiver}="${closeToggler}"]`), closeTogglerInstance, false);
            });
        };
        toggle();
        const updateMultiToggle = () => {
            this.map.forEach((multiTogglerInstance, key) => {
                if (!togglerInstance.state) {
                    if (multiTogglerInstance.targets.includes(togglerValue)) {
                        multiTogglerInstance.state = false;
                        this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.toggler}="${key}"]`), multiTogglerInstance, true);
                    }
                }
                else {
                    if (multiTogglerInstance.targets.includes(togglerValue)) {
                        const allTrue = multiTogglerInstance.targets.every((target) => {
                            const targetInstance = this.map.get(target);
                            if (!targetInstance)
                                return false;
                            return targetInstance.state;
                        });
                        if (allTrue) {
                            multiTogglerInstance.state = true;
                            this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.toggler}="${key}"]`), multiTogglerInstance, true);
                        }
                    }
                }
            });
        };
        toggler.addEventListener("click", (e) => {
            e.preventDefault();
            togglerInstance.state = !togglerInstance.state;
            toggle();
            updateMultiToggle();
        });
    }
    #multiClickEvent(toggler) {
        const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
        if (!togglerValue)
            return;
        const togglerInstance = this.map.get(togglerValue);
        if (!togglerInstance)
            return;
        toggler.addEventListener("click", (e) => {
            e.preventDefault();
            togglerInstance.state = !togglerInstance.state;
            this.#multiToggle(togglerInstance, togglerValue);
        });
    }
    #multiToggle(toggler, parentToggle) {
        toggler.targets.map((target) => {
            const targetInstance = this.map.get(target);
            if (!targetInstance)
                return;
            targetInstance.state = toggler.state;
            this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.toggler}="${target}"]`), targetInstance, true);
            this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.receiver}="${target}"]`), targetInstance, false);
        });
        this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.toggler}="${parentToggle}"]`), toggler, true);
    }
    #updateGroup(group, togglerInstance, aria) {
        [...group].map((receiver) => {
            if (togglerInstance.state) {
                receiver.classList.add(togglerInstance.activeClass);
                if (aria)
                    receiver.setAttribute("aria-expanded", "true");
            }
            else {
                receiver.classList.remove(togglerInstance.activeClass);
                if (aria)
                    receiver.setAttribute("aria-expanded", "false");
            }
        });
    }
}
//# sourceMappingURL=index.js.map