var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EnhancedFileInput_instances, _EnhancedFileInput_registerEvents, _EnhancedFileInput_onChange, _EnhancedFileInput_setClasses;
const attributes = {
    input: "data-ei-input",
    clear: "data-ei-clear",
};
export default class EnhancedFileInput {
    constructor(selector, config) {
        _EnhancedFileInput_instances.add(this);
        this.inputMap = new WeakMap();
        this.config = Object.assign({ classes: {
                hasFile: "has-file",
                dragOver: "drag-over",
            } }, config);
        const containers = document.querySelectorAll(selector);
        if (!containers)
            return;
        containers.forEach((container) => {
            const input = container.querySelector(`[${attributes.input}]`);
            if (!input) {
                console.warn("EnhancedFileInput: No input with attribute 'data-ei-input' found in parent element.");
                return;
            }
            if (this.inputMap.has(input))
                return;
            this.inputMap.set(container, {
                input: input,
                clearButton: container.querySelector(`[${attributes.clear}]`),
                hasFile: false,
                dragOver: false,
            });
            __classPrivateFieldGet(this, _EnhancedFileInput_instances, "m", _EnhancedFileInput_registerEvents).call(this, container);
        });
    }
}
_EnhancedFileInput_instances = new WeakSet(), _EnhancedFileInput_registerEvents = function _EnhancedFileInput_registerEvents(container) {
    const instance = this.inputMap.get(container);
    if (!instance)
        return;
    container.addEventListener("click", (e) => {
        if (e.target === instance.input)
            return;
        if (e.target === instance.clearButton)
            return;
        instance.input.click();
    });
    instance.input.addEventListener("change", () => {
        var _a;
        if ((_a = instance.input.files) === null || _a === void 0 ? void 0 : _a.length) {
            instance.hasFile = true;
        }
        else {
            instance.hasFile = false;
            instance.input.value = "";
        }
        __classPrivateFieldGet(this, _EnhancedFileInput_instances, "m", _EnhancedFileInput_onChange).call(this, container, instance);
    });
    container.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
        instance.dragOver = true;
        __classPrivateFieldGet(this, _EnhancedFileInput_instances, "m", _EnhancedFileInput_onChange).call(this, container, instance);
    });
    container.addEventListener("dragleave", (e) => {
        e.preventDefault();
        e.stopPropagation();
        instance.dragOver = false;
        __classPrivateFieldGet(this, _EnhancedFileInput_instances, "m", _EnhancedFileInput_onChange).call(this, container, instance);
    });
    container.addEventListener("drop", (e) => {
        var _a, _b;
        e.preventDefault();
        e.stopPropagation();
        instance.dragOver = false;
        __classPrivateFieldGet(this, _EnhancedFileInput_instances, "m", _EnhancedFileInput_onChange).call(this, container, instance);
        if ((_b = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b.length) {
            if (instance.input.multiple) {
                instance.input.files = e.dataTransfer.files;
            }
            else {
                const dt = new DataTransfer();
                for (let i = 0; i < e.dataTransfer.files.length; i++) {
                    const file = e.dataTransfer.files[i];
                    if (i === 0)
                        dt.items.add(file);
                    break;
                }
                instance.input.files = dt.files;
            }
            instance.hasFile = true;
            __classPrivateFieldGet(this, _EnhancedFileInput_instances, "m", _EnhancedFileInput_onChange).call(this, container, instance);
        }
    });
    if (instance.clearButton) {
        instance.clearButton.addEventListener("click", () => {
            instance.input.value = "";
            instance.hasFile = false;
            __classPrivateFieldGet(this, _EnhancedFileInput_instances, "m", _EnhancedFileInput_onChange).call(this, container, instance);
        });
    }
}, _EnhancedFileInput_onChange = function _EnhancedFileInput_onChange(container, instance) {
    if (this.config.onChange)
        this.config.onChange(container, instance);
    __classPrivateFieldGet(this, _EnhancedFileInput_instances, "m", _EnhancedFileInput_setClasses).call(this, container, instance);
}, _EnhancedFileInput_setClasses = function _EnhancedFileInput_setClasses(container, instance) {
    container.classList.remove(this.config.classes.hasFile);
    container.classList.remove(this.config.classes.dragOver);
    if (instance.hasFile)
        container.classList.add(this.config.classes.hasFile);
    if (instance.dragOver)
        container.classList.add(this.config.classes.dragOver);
};
//# sourceMappingURL=enhanced-file-input.js.map