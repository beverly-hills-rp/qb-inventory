import { event } from "@utils";

import { inventoryManager } from 'src';
import { InventoryResponse } from "src/inventory-manager";

export default event('message', async ({ log }, event) => {
    if (event.data.action !== 'open') return;

    console.log(event.data)

    if (typeof event.data.inventory == "object")
        event.data.inventory = Object.values(event.data.inventory)

    if (typeof event.data.other?.inventory == "object")
        event.data.other.inventory = Object.values(event.data.other?.inventory)

    const data: InventoryResponse = event.data;

    inventoryManager.setData(data);
    inventoryManager.open();
});
