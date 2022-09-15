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