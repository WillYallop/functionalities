import type Container from "./container";
import type Track from "./track";
declare class Pagination extends HTMLElement {
    updateTimeout: ReturnType<typeof setTimeout> | null;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
    initialAttributes(): void;
    registerEvents(): void;
    updateState(index: number): void;
    buttonClick(e: MouseEvent): void;
    buttonKeyDown(e: KeyboardEvent): void;
    update(): void;
    get container(): Container;
    get track(): Track;
    get ul(): HTMLUListElement | null;
    get listItems(): NodeListOf<HTMLLIElement>;
    get buttons(): NodeListOf<HTMLButtonElement>;
}
export default Pagination;
//# sourceMappingURL=pagination.d.ts.map