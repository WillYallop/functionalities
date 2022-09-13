export default class Disclosure {
    attributes = {
        container: "container",
        region: "region",
        toggle: "toggle",
    };
    disclosures;
    config;
    constructor(config) {
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
            this.#preflight(disclosure);
        });
    }
    #preflight(ele) {
        const disclosure = this.disclosures.get(ele);
        if (!disclosure)
            return;
        this.#toggleEle(ele, disclosure.state, false);
        this.#toggleTogglers(disclosure);
        this.#toggleEle(disclosure.region, disclosure.state, true);
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
                this.#trigger(ele);
            });
            toggler.addEventListener("keydown", (e) => {
                if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    this.#trigger(ele);
                }
            });
        });
    }
    #trigger(ele) {
        const disclosure = this.disclosures.get(ele);
        if (!disclosure)
            return;
        disclosure.state = !disclosure.state;
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
    #toggleEle(ele, state, region) {
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
    }
    #toggleTogglers(disclosure) {
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
    }
}
//# sourceMappingURL=index.js.map