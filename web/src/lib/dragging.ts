export interface DraggableOptions {
    onStart?: (event: MouseEvent) => void;
    onDrag?: (event: MouseEvent, element: HTMLElement, offsetX: number, offsetY: number) => void;
    onDrop?: (event: MouseEvent, element: HTMLElement, target: HTMLElement, parent: HTMLElement) => void;
}

const dragElement = document.getElementById('drag-helper') ?? document.createElement('div');

export class Draggable {
    private parent?: HTMLElement;
    private element?: HTMLElement;
    private dragOffsetX: number = 0;
    private dragOffsetY: number = 0;
    private onStart: (event: MouseEvent) => void;
    private onDrag: (event: MouseEvent, element: HTMLElement, offsetX: number, offsetY: number) => void;
    private onDrop: (event: MouseEvent, element: HTMLElement, target: HTMLElement, parent: HTMLElement) => void;
    private droppableClass: string = 'droppable';

    constructor(selector: string, options: DraggableOptions = {}) {
        const elements = document.querySelectorAll(selector);

        this.onStart = options.onStart || (() => { });
        this.onDrag = options.onDrag || (() => { });
        this.onDrop = options.onDrop || (() => { });

        elements.forEach((element) => {
            (element as HTMLElement).addEventListener('mousedown', this.handleMouseDown);
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
        });

        if (dragElement.id !== 'drag-helper') {
            dragElement.id = 'drag-helper';
            document.body.appendChild(dragElement);
        }
    }

    private handleMouseDown = (event: MouseEvent) => {
        this.element = event.target as HTMLElement;
        this.parent = this.element.parentElement as HTMLElement;
        this.dragOffsetX = event.offsetX;
        this.dragOffsetY = event.offsetY;

        if (!this.element.classList.contains('dragging'))
            this.element.classList.add('dragging');

        const left = event.x - this.dragOffsetX;
        const top = event.y - this.dragOffsetY;

        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        this.attachToHelper();

        this.onStart(event);
    };

    private handleMouseMove = (event: MouseEvent) => {
        if (this.element && this.element.classList.contains('dragging')) {
            const offsetX = event.x - this.dragOffsetX;
            const offsetY = event.y - this.dragOffsetY;

            const left = offsetX;
            const top = offsetY;

            this.element.style.left = `${left}px`;
            this.element.style.top = `${top}px`;

            this.onDrag(event, this.element, offsetX, offsetY);
        }
    };

    private handleMouseUp = (event: MouseEvent) => {
        if (this.element && this.element.classList.contains('dragging')) {
            this.element.classList.remove('dragging');

            // Find the droppable element under the draggable element
            const droppable = this.getDroppableElement(document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null);

            if (droppable && droppable !== this.parent) {
                // droppable.appendChild(this.element);
                this.onDrop(event, this.element, droppable, this.parent!);
            } else {
                this.parent!.appendChild(this.element);
            }
        }

        this.element = undefined;
        this.parent = undefined;
    };

    private getDroppableElement(element: HTMLElement | null): HTMLElement | null {
        if (element && element.classList.contains(this.droppableClass)) {
            return element;
        } else if (element) {
            return this.getDroppableElement(element.parentElement);
        } else {
            return null;
        }
    }

    private attachToHelper() {
        dragElement.innerHTML = '';
        dragElement.appendChild(this.element!);
    }

    public destroy() {
        const elements = document.querySelectorAll('.dragging');

        elements.forEach((element) => {
            element.classList.remove('dragging');
            (element as HTMLElement).removeEventListener('mousedown', this.handleMouseDown);
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
        });
    }
}
