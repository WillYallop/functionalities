var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Disclosure_instances, _Disclosure_init, _Disclosure_preflight, _Disclosure_trigger, _Disclosure_toggleEle, _Disclosure_toggleTogglers;
export default class Disclosure {
    constructor(config) {
        _Disclosure_instances.add(this);
        this.attributes = {
            container: "container",
            region: "region",
            toggle: "toggle",
        };
        this.disclosures = new Map();
        const defaultConfig = {
            idPrefix: "disclosure_",
            activeClass: "disclosure-active",
            targetAttribute: "data-disclosure",
            duration: 200,
            defaultState: false,
            closeAll: true,
        };
        this.config = Object.assign(Object.assign({}, defaultConfig), config);
        __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_init).call(this);
    }
}
_Disclosure_instances = new WeakSet(), _Disclosure_init = function _Disclosure_init() {
    const disclosures = document.querySelectorAll(`[${this.config.targetAttribute}="${this.attributes.container}"]`);
    disclosures.forEach((disclosure, index) => {
        let state = this.config.defaultState;
        if (disclosure.hasAttribute(`${this.config.targetAttribute}-state`)) {
            state =
                disclosure.getAttribute(`${this.config.targetAttribute}-state`) ===
                    "true";
        }
        this.disclosures.set(disclosure, {
            index: index,
            state: state,
            region: disclosure.querySelector(`[${this.config.targetAttribute}="${this.attributes.region}"]`),
            regionScrollHeight: 0,
            togglers: disclosure.querySelectorAll(`[${this.config.targetAttribute}="${this.attributes.toggle}"]`),
        });
        __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_preflight).call(this, disclosure);
    });
}, _Disclosure_preflight = function _Disclosure_preflight(ele) {
    const disclosure = this.disclosures.get(ele);
    if (!disclosure)
        return;
    __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleEle).call(this, ele, disclosure.state, false);
    __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleTogglers).call(this, disclosure);
    __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleEle).call(this, disclosure.region, disclosure.state, true);
    disclosure.region.style.transition = `max-height ${this.config.duration}ms ease-in-out`;
    disclosure.region.style.overflow = "hidden";
    disclosure.region.setAttribute("role", "region");
    disclosure.region.setAttribute("id", `${this.config.idPrefix}region-${disclosure.index}`);
    disclosure.togglers.forEach((toggler, index) => {
        toggler.setAttribute("role", "button");
        toggler.setAttribute("aria-controls", disclosure.region.id);
        toggler.setAttribute("id", `${this.config.idPrefix}toggler-${disclosure.index}-${index}`);
        if (index === 0) {
            disclosure.region.setAttribute("aria-labelledby", disclosure.togglers[0].id);
        }
        toggler.addEventListener("click", (e) => {
            e.preventDefault();
            __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_trigger).call(this, ele);
        });
        toggler.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_trigger).call(this, ele);
            }
        });
    });
}, _Disclosure_trigger = function _Disclosure_trigger(ele) {
    const disclosure = this.disclosures.get(ele);
    if (!disclosure)
        return;
    disclosure.state = !disclosure.state;
    if (this.config.closeAll && disclosure.state) {
        for (let [key, value] of this.disclosures.entries()) {
            if (key !== ele) {
                value.state = false;
                __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleEle).call(this, key, value.state, false);
                __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleTogglers).call(this, value);
                __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleEle).call(this, value.region, value.state, true);
            }
        }
    }
    __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleEle).call(this, ele, disclosure.state, false);
    __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleTogglers).call(this, disclosure);
    __classPrivateFieldGet(this, _Disclosure_instances, "m", _Disclosure_toggleEle).call(this, disclosure.region, disclosure.state, true);
}, _Disclosure_toggleEle = function _Disclosure_toggleEle(ele, state, region) {
    if (state) {
        ele.classList.add(this.config.activeClass);
        if (region) {
            ele.style.maxHeight = ele.scrollHeight + "px";
        }
    }
    else {
        ele.classList.remove(this.config.activeClass);
        if (region) {
            ele.style.maxHeight = "0px";
        }
    }
}, _Disclosure_toggleTogglers = function _Disclosure_toggleTogglers(disclosure) {
    disclosure.togglers.forEach((toggler) => {
        if (disclosure.state) {
            toggler.classList.add(this.config.activeClass);
            toggler.setAttribute("aria-expanded", "true");
        }
        else {
            toggler.classList.remove(this.config.activeClass);
            toggler.setAttribute("aria-expanded", "false");
        }
    });
};
//# sourceMappingURL=index.js.map