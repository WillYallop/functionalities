import Recaptcha from "./recaptcha";
export default class GoogleV2 extends Recaptcha {
    instance: any;
    constructor(key: string);
    initialise(formEle: HTMLFormElement): void;
    refresh(): Promise<void>;
}
//# sourceMappingURL=googlev2.d.ts.map