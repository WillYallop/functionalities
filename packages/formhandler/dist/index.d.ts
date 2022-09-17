interface CustomValidation {
    name: string;
    validator: (value: string) => string;
}
interface Config {
    validateOnChange?: boolean;
    externalValidation?: boolean;
    customValidation?: Array<CustomValidation>;
    errorClass?: string;
    reset?: boolean;
    showMessageDuration?: number;
    submitForm: (form: HTMLFormElement) => Promise<{
        success: boolean;
        message?: string;
        errors?: any;
    }>;
    onError?: (errors: any) => void;
}
interface DefaultConfig {
    validateOnChange: boolean;
    externalValidation: boolean;
    customValidation: Array<CustomValidation>;
    errorClass: string;
    reset: boolean;
    showMessageDuration: number;
    submitForm: (form: HTMLFormElement) => Promise<{
        success: boolean;
        message?: string;
        errors?: any;
    }>;
    onError?: (errors: any) => void;
    attributes: {
        inputRelation: string;
        formSubmit: string;
        formStatus: string;
        formMessage: string;
    };
}
export default class FormHandler {
    #private;
    config: DefaultConfig;
    form: HTMLFormElement;
    constructor(formSelector: string, config: Config);
    setInputError(name: string): void;
}
export {};
//# sourceMappingURL=index.d.ts.map