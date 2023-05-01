interface TooltipOptions {
    selector: string;
    tooltipBuilder: (element: HTMLElement) => HTMLElement | string;
    delay?: number;
}

export class Tooltip {
    private selector: string;
    private tooltipBuilder: (element: HTMLElement) => HTMLElement | string;
    private delay: number;
    private tooltip: HTMLElement | null = null;
    private timeoutId: number | null = null;
    private mouseX: number = 0;
    private mouseY: number = 0;

    private boundHandleMouseEnter: (event: MouseEvent) => void;
    private boundHandleMouseLeave: (event: MouseEvent) => void;
    private boundHandleMouseMove: (event: MouseEvent) => void;

    constructor(options: TooltipOptions) {
        this.selector = options.selector;
        this.tooltipBuilder = options.tooltipBuilder;
        this.delay = options.delay || 150;

        this.boundHandleMouseEnter = this.handleMouseEnter.bind(this);
        this.boundHandleMouseLeave = this.handleMouseLeave.bind(this);
        this.boundHandleMouseMove = this.handleMouseMove.bind(this);

        document.addEventListener("mousemove", this.boundHandleMouseMove);

        this.initialize();
    }

    private initialize() {
        const elements = document.querySelectorAll(this.selector);
        elements.forEach((element) => {
            (element as HTMLElement).addEventListener("mouseenter", this.boundHandleMouseEnter);
            (element as HTMLElement).addEventListener("mouseleave", this.boundHandleMouseLeave);
        });
    }

    private handleMouseEnter(event: MouseEvent) {
        this.timeoutId = window.setTimeout(() => {
            this.showTooltip(event.target as HTMLElement);
        }, this.delay);
    }

    private handleMouseLeave() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.destroyTooltip();
    }

    private showTooltip(element: HTMLElement) {
        this.destroyTooltip();

        const tooltip = this.createTooltip(element);
        this.tooltip = tooltip;

        document.body.appendChild(tooltip);
    }

    private createTooltip(element: HTMLElement): HTMLElement {
        const tooltipContent = this.tooltipBuilder(element);
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.innerHTML = typeof tooltipContent === "string" ? tooltipContent : "";
        if (tooltipContent instanceof HTMLElement) {
            tooltip.appendChild(tooltipContent);
        }
        tooltip.style.position = "absolute";
        tooltip.style.zIndex = "9999";
        tooltip.style.pointerEvents = "none";
        tooltip.style.opacity = "0";

        document.body.appendChild(tooltip);

        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;

        const position = this.calculatePosition(tooltipRect, viewportWidth, viewportHeight);

        tooltip.style.top = position.top + "px";
        tooltip.style.left = position.left + "px";
        tooltip.style.opacity = "1";

        return tooltip;
    }

    private calculatePosition(
        tooltipRect: DOMRect,
        viewportWidth: number,
        viewportHeight: number
    ) {
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;

        const isTooltipOverflowingRight = this.mouseX + tooltipWidth > viewportWidth;
        const isTooltipOverflowingBottom = this.mouseY + tooltipHeight > viewportHeight;

        let top = this.mouseY + 10;
        let left = this.mouseX;

        if (isTooltipOverflowingRight) {
            left = viewportWidth - tooltipWidth - 10;
        } else {
            left = this.mouseX;
        }

        if (isTooltipOverflowingBottom) {
            top = this.mouseY - tooltipHeight - 10;
        } else {
            top = this.mouseY + 10;
        }

        return { top, left };
    }

    private handleMouseMove(event: MouseEvent) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    private destroyTooltip() {
        if (this.tooltip && this.tooltip.parentNode) {
            this.tooltip.parentNode.removeChild(this.tooltip);
            this.tooltip = null;
        }
    }

    destroy() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        this.destroyTooltip();

        const elements = document.querySelectorAll(this.selector);
        elements.forEach((element) => {
            (element as HTMLElement).removeEventListener("mouseenter", this.boundHandleMouseEnter);
            (element as HTMLElement).removeEventListener("mouseleave", this.boundHandleMouseLeave);
        });

        document.removeEventListener("mousemove", this.boundHandleMouseMove);
    }
}
