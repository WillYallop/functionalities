// Types
interface Config {
  activeClass?: string;
  reset?: boolean;
  threshold?: number;
}
interface DefaultConfig {
  activeClass: string;
  reset: boolean;
  threshold: number;
  attributes: {
    animate: string;
  };
}
interface AnimationAttributeObj {
  class: string;
  delay?: number;
  reset?: boolean;
}

export default class Animations {
  config: DefaultConfig;
  map: WeakMap<HTMLElement, Array<AnimationAttributeObj>>;
  constructor(config?: Config) {
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
    // add intersection observer
    const observer = new IntersectionObserver(
      this.#intersectionObserverCallback,
      {
        threshold: this.config.threshold,
      }
    );

    // get all elements with the data-animate attribute
    const elements = document.querySelectorAll(
      `[${this.config.attributes.animate}]`
    ) as NodeListOf<HTMLElement>;
    [...elements].forEach((element) => {
      // get the attribute value
      const attribute = element.getAttribute(
        this.config.attributes.animate
      ) as string;
      // parse the attribute value
      const attributeObj = this.#parseAttribute(attribute);
      // add the element to the map
      this.map.set(element, attributeObj);
      observer.observe(element);
    });
  }
  #parseAttribute(attribute: string): Array<AnimationAttributeObj> {
    // parse invald json string for JSON parse
    const parsedAttribute = attribute
      .replace(/'/g, '"')
      .replace(/([a-zA-Z0-9]+):/g, '"$1":')
      .replace(/:(?=[a-zA-Z0-9])/g, ':"')
      .replace(/,(?=[a-zA-Z0-9])/g, '",')
      .replace(/}$/, '"}');
    // parse the attribute value
    const arr = [
      ...(JSON.parse(parsedAttribute) as Array<AnimationAttributeObj>),
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
  #intersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement;
      const attributeObj = this.map.get(element);

      if (attributeObj) {
        const toggleOn = (obj: AnimationAttributeObj) => {
          setTimeout(() => {
            element.classList.add(obj.class);
          }, obj.delay || 0);
        };
        const toggleOff = (obj: AnimationAttributeObj) => {
          element.classList.remove(obj.class);
        };

        if (entry.isIntersecting) {
          element.classList.add(this.config.activeClass);
          attributeObj.forEach((obj) => {
            toggleOn(obj);
          });
        } else {
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
