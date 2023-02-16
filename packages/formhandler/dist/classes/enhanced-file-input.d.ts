interface EnhancedFileInputConfigParam {
    onChange?: (container: HTMLElement, instance: InputMapObject) => void;
    classes?: {
        hasFile?: string;
        dragOver?: string;
    };
}
interface EnhancedFileInputConfig extends EnhancedFileInputConfigParam {
    classes: {
        hasFile: string;
        dragOver: string;
    };
}
interface InputMapObject {
    input: HTMLInputElement;
    clearButton?: HTMLElement;
    hasFile: boolean;
    dragOver: boolean;
}
export default class EnhancedFileInput {
    #private;
    config: EnhancedFileInputConfig;
    inputMap: WeakMap<HTMLElement, InputMapObject>;
    constructor(selector: string, config?: EnhancedFileInputConfigParam);
}
export {};
//# sourceMappingURL=enhanced-file-input.d.ts.map