import FlashMessage from "./classes/flash-message";
import Turnstile from "./classes/recaptcha/turnstile";
import GoogleV2 from "./classes/recaptcha/googlev2";
declare type ResErrors = {
    [key: string]: Array<string>;
};
interface CustomValidation {
    name: string;
    validator: (value: string) => string;
}
interface SendResponse {
    success: boolean;
    message: string;
    errors?: ResErrors;
}
interface Config {
    recaptcha?: Turnstile | GoogleV2;
    resetOnSuccess?: boolean;
    flashMessage?: FlashMessage;
    disableSubmit?: boolean;
    validate?: {
        onChange?: boolean;
        onSubmit?: boolean;
    };
    localisation?: {
        validationError?: string;
        error?: string;
        success?: string;
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
    send?: (action: string, data: FormData) => Promise<SendResponse>;
}
export default class FormHandler {
    #private;
    config: Config;
    form: HTMLFormElement;
    inputValidationLock: boolean;
    constructor(formSelector: string, config?: Config);
}
export { FlashMessage, Turnstile, GoogleV2 };
//# sourceMappingURL=index.d.ts.map