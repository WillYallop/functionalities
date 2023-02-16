interface CustomValidation {
    name: string;
    validator: (value: string) => string;
}
interface Config {
    validate?: {
        onChange?: boolean;
        onBlur?: boolean;
        onSubmit?: boolean;
    };
    errorClass?: string;
    action?: string;
    customValidation?: Array<CustomValidation>;
    attributes?: {
        inputRelation?: string;
        inputError?: string;
    };
    onSuccess?: (form: HTMLFormElement, res: any) => void;
    onError?: (form: HTMLFormElement, res: any) => void;
}
export default class FormHandler {
    #private;
    config: Config;
    form: HTMLFormElement;
    constructor(formSelector: string, config: Config);
}
export {};
//# sourceMappingURL=form-handler.d.ts.map