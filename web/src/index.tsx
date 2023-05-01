import { registerEvents } from '@utils';
import { InventoryWithGroundItems } from '@types';

import { InventoryManager } from './inventory-manager';
import events from './events';

import './styles';
import { isEnvBrowser } from './utils/misc';

export const inventoryManager = new InventoryManager();

if (isEnvBrowser())
    window.onload = () => {
        window.postMessage(InventoryWithGroundItems);
    };

window.addEventListener('DOMContentLoaded', () => {
    console.log("registering events")
    registerEvents(events);
});
