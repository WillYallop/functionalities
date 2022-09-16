export default class Animations {
    config;
    map;
    constructor(config) {
        this.config = {
            reset: true,
            activeClass: "animate",
            threshold: 1,
            attributes: {
                animate: "data-animate",
            },
            ...config,
        };
        this.map = new WeakMap();
        this.#initialise();
    }
    #initialise() {
        const observer = new IntersectionObserver(this.#intersectionObserverCallback, {
            threshold: this.config.threshold,
        });
        const elements = document.querySelectorAll(`[${this.config.attributes.animate}]`);
        [...elements].forEach((element) => {
            const attribute = element.getAttribute(this.config.attributes.animate);
            const attributeObj = this.#parseAttribute(attribute);
            this.map.set(element, attributeObj);
            observer.observe(element);
        });
    }
    #parseAttribute(attribute) {
        const parsedAttribute = attribute
            .replace(/'/g, '"')
            .replace(/([a-zA-Z0-9]+):/g, '"$1":')
            .replace(/:(?=[a-zA-Z0-9])/g, ':"')
            .replace(/,(?=[a-zA-Z0-9])/g, '",')
            .replace(/}$/, '"}');
        const arr = [
            ...JSON.parse(parsedAttribute),
        ];
        return arr.filter((obj) => {
            if (obj.class !== undefined) {
                obj.delay = obj.delay || 0;
                obj.reset =
                    typeof obj.reset === "boolean" ? obj.reset : this.config.reset;
                return obj;
            }
        });
    }
    #intersectionObserverCallback = (entries, observer) => {
        entries.forEach((entry) => {
            const element = entry.target;
            const attributeObj = this.map.get(element);
            if (attributeObj) {
                const toggleOn = (obj) => {
                    setTimeout(() => {
                        element.classList.add(obj.class);
                    }, obj.delay || 0);
                };
                const toggleOff = (obj) => {
                    element.classList.remove(obj.class);
                };
                if (entry.isIntersecting) {
                    element.classList.add(this.config.activeClass);
                    attributeObj.forEach((obj) => {
                        toggleOn(obj);
                    });
                }
                else {
                    if (this.config.reset) {
                        element.classList.remove(this.config.activeClass);
                    }
                    attributeObj.forEach((obj) => {
                        if (obj.reset) {
                            toggleOff(obj);
                        }
                    });
                }
            }
        });
    };
}
//# sourceMappingURL=index.js.map