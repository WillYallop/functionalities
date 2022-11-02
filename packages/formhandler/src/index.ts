import FormHandler from "./functions/form-handler";
import flashMessage from "./functions/flash-message";
import conditionalInputs from "./functions/conditional-inputs";
import GoogleV2 from "./functions/recaptcha/googlev2";
import Turnstile from "./functions/recaptcha/turnstile";

export { flashMessage, conditionalInputs, GoogleV2, Turnstile };
export default FormHandler;
