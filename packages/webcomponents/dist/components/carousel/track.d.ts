import type Container from "./container";
declare class Track extends HTMLElement {
    dragging: boolean;
    dragStartX: number;
    dragStartY: number;
    dragEndX: number;
    dragEndY: number;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    initialAttributes(): void;
    registerEvents(): void;
    onMouseDown(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
    onMouseLeave(e: MouseEvent): void;
    onTouchStart(e: TouchEvent): void;
    onTouchEnd(e: TouchEvent): void;
    onTouchCancel(e: TouchEvent): void;
    dragStart(clientX: number, clientY: number): void;
    dragEnd(clientX: number, clientY: number): void;
    scrollToSlide(): void;
    get container(): Container;
    get slides(): NodeListOf<import("./slide").default>;
    get dragOffsetX(): number;
    get dragOffsetY(): number;
}
export default Track;
//# sourceMappingURL=track.d.ts.map