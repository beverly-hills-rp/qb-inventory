import { Draggable } from '@lib';
import { destroyTooltips, setupTooltip } from '@utils';
import { inventoryManager } from 'src';

const draggableList: Draggable[] = [];

export const destroyDnD = () => {
    draggableList.forEach((draggable) => draggable.destroy());
    draggableList.splice(0, draggableList.length);
};

export const setupDnD = () => {
    destroyDnD();

    const draggable = new Draggable('.slot > .item', {
        onStart: (event) => destroyTooltips(),
        onDrag: (event, element, offsetX, offsetY) => { },
        onDrop: (event, element, target, parent) => inventoryManager.handleDnD(event, element, target, parent),
    });

    draggableList.push(draggable);
};
