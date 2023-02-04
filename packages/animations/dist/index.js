var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Animations_instances, _Animations_initialise, _Animations_parseAttribute, _Animations_intersectionObserverCallback;
export default class Animations {
    constructor(config) {
        _Animations_instances.add(this);
        _Animations_intersectionObserverCallback.set(this, (entries, observer) => {
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
        });
        this.config = Object.assign({ reset: true, activeClass: "animate", threshold: 1, attributes: {
                animate: "data-animate",
            } }, config);
        this.map = new WeakMap();
        __classPrivateFieldGet(this, _Animations_instances, "m", _Animations_initialise).call(this);
    }
}
_Animations_intersectionObserverCallback = new WeakMap(), _Animations_instances = new WeakSet(), _Animations_initialise = function _Animations_initialise() {
    const observer = new IntersectionObserver(__classPrivateFieldGet(this, _Animations_intersectionObserverCallback, "f"), {
        threshold: this.config.threshold,
    });
    const elements = document.querySelectorAll(`[${this.config.attributes.animate}]`);
    [...elements].forEach((element) => {
        const attribute = element.getAttribute(this.config.attributes.animate);
        const attributeObj = __classPrivateFieldGet(this, _Animations_instances, "m", _Animations_parseAttribute).call(this, attribute);
        this.map.set(element, attributeObj);
        observer.observe(element);
    });
}, _Animations_parseAttribute = function _Animations_parseAttribute(attribute) {
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
};
//# sourceMappingURL=index.js.map