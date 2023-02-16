export default class FlashMessage {
    #private;
    element: HTMLElement;
    attributes: {
        message: string;
        close: string;
    };
    state: boolean;
    duration: number;
    constructor(selector: string, duration?: number);
    flash(message: string, success: boolean): void;
}
//# sourceMappingURL=flash-message.d.ts.map