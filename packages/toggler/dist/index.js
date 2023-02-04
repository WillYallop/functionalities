var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Toggler_instances, _Toggler_initialise, _Toggler_clickEvent, _Toggler_multiClickEvent, _Toggler_multiToggle, _Toggler_updateGroup;
export default class Toggler {
    constructor(config) {
        _Toggler_instances.add(this);
        this.config = Object.assign({ activeClass: "active", attributes: {
                toggler: "data-toggler",
                receiver: "data-toggler-receiver",
                class: "data-toggler-class",
                state: "data-toggler-state",
                close: "data-toggler-close",
                targets: "data-toggler-targets",
            } }, config);
        this.map = new Map();
        __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_initialise).call(this);
    }
}
_Toggler_instances = new WeakSet(), _Toggler_initialise = function _Toggler_initialise() {
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
            __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_multiClickEvent).call(this, toggler);
        else
            __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_clickEvent).call(this, toggler);
    });
    this.map.forEach((togglerInstance, key) => {
        if (togglerInstance.targets.length > 0) {
            if (togglerInstance.state)
                __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_multiToggle).call(this, togglerInstance, key);
        }
    });
}, _Toggler_clickEvent = function _Toggler_clickEvent(toggler) {
    const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
    if (!togglerValue)
        return;
    const togglerInstance = this.map.get(togglerValue);
    if (!togglerInstance)
        return;
    const toggle = () => {
        __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.receiver}="${togglerValue}"]`), togglerInstance, false);
        __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.toggler}="${togglerValue}"]`), togglerInstance, true);
        togglerInstance.closeTogglers.map((closeToggler) => {
            const closeTogglerInstance = this.map.get(closeToggler);
            if (!closeTogglerInstance)
                return;
            closeTogglerInstance.state = false;
            __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.toggler}="${closeToggler}"]`), closeTogglerInstance, true);
            __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.receiver}="${closeToggler}"]`), closeTogglerInstance, false);
        });
    };
    toggle();
    const updateMultiToggle = () => {
        this.map.forEach((multiTogglerInstance, key) => {
            if (!togglerInstance.state) {
                if (multiTogglerInstance.targets.includes(togglerValue)) {
                    multiTogglerInstance.state = false;
                    __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.toggler}="${key}"]`), multiTogglerInstance, true);
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
                        __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.toggler}="${key}"]`), multiTogglerInstance, true);
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
}, _Toggler_multiClickEvent = function _Toggler_multiClickEvent(toggler) {
    const togglerValue = toggler.getAttribute(this.config.attributes.toggler);
    if (!togglerValue)
        return;
    const togglerInstance = this.map.get(togglerValue);
    if (!togglerInstance)
        return;
    toggler.addEventListener("click", (e) => {
        e.preventDefault();
        togglerInstance.state = !togglerInstance.state;
        __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_multiToggle).call(this, togglerInstance, togglerValue);
    });
}, _Toggler_multiToggle = function _Toggler_multiToggle(toggler, parentToggle) {
    toggler.targets.map((target) => {
        const targetInstance = this.map.get(target);
        if (!targetInstance)
            return;
        targetInstance.state = toggler.state;
        __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.toggler}="${target}"]`), targetInstance, true);
        __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.receiver}="${target}"]`), targetInstance, false);
    });
    __classPrivateFieldGet(this, _Toggler_instances, "m", _Toggler_updateGroup).call(this, document.querySelectorAll(`[${this.config.attributes.toggler}="${parentToggle}"]`), toggler, true);
}, _Toggler_updateGroup = function _Toggler_updateGroup(group, togglerInstance, aria) {
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
};
//# sourceMappingURL=index.js.map