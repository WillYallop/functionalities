export default class Toggler {
    config;
    map;
    multiToggler;
    constructor(config) {
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
        const togglers = document.querySelectorAll(`[${this.config.attributes.toggler}]`);
        const multiToggler = document.querySelectorAll(`[${this.config.attributes.multi}]`);
        [...togglers].map((toggler) => {
            const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
            if (!togglerValue)
                return;
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
            });
            this.#clickEvent(toggler);
        });
        [...multiToggler].map((toggler) => {
            const togglerValue = toggler.getAttribute(this.config.attributes.multi);
            if (!togglerValue)
                return;
            const targets = toggler.getAttribute(this.config.attributes.multiTargets);
            const targetTogglerVals = targets
                ? targets.replaceAll(" ", "").split(",")
                : [];
            if (this.multiToggler.has(togglerValue))
                return;
            this.multiToggler.set(togglerValue, {
                state: toggler.getAttribute(this.config.attributes.multiState) === "true",
                targets: targetTogglerVals,
                activeClass: toggler.getAttribute(this.config.attributes.class) ||
                    this.config.activeClass,
            });
            this.#multiClickEvent(toggler);
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
        const resetMultiTogglers = () => {
            this.multiToggler.forEach((multiTogglerInstance, key) => {
                if (multiTogglerInstance.targets.includes(togglerValue)) {
                    multiTogglerInstance.state = false;
                    this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.multi}="${key}"]`), multiTogglerInstance, true);
                }
            });
        };
        toggler.addEventListener("click", (e) => {
            e.preventDefault();
            togglerInstance.state = !togglerInstance.state;
            toggle();
            if (!togglerInstance.state)
                resetMultiTogglers();
        });
    }
    #multiClickEvent(toggler) {
        const togglerValue = toggler.getAttribute(this.config.attributes.multi);
        if (!togglerValue)
            return;
        const togglerInstance = this.multiToggler.get(togglerValue);
        if (!togglerInstance)
            return;
        const toggle = () => {
            togglerInstance.targets.map((target) => {
                const targetInstance = this.map.get(target);
                if (!targetInstance)
                    return;
                targetInstance.state = togglerInstance.state;
                this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.toggler}="${target}"]`), targetInstance, true);
                this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.receiver}="${target}"]`), targetInstance, false);
            });
            this.#updateGroup(document.querySelectorAll(`[${this.config.attributes.multi}="${togglerValue}"]`), togglerInstance, true);
        };
        toggle();
        toggler.addEventListener("click", (e) => {
            e.preventDefault();
            togglerInstance.state = !togglerInstance.state;
            toggle();
        });
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