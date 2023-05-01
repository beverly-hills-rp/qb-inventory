import { event } from "@utils";
import { inventoryManager } from "src";

export default event('keydown', async ({ log }, event) => {
    if (event.repeat) {
        return;
    }

    switch (event.keyCode) {
        case 27: // ESC
            inventoryManager.close();
            break;
        case 9: // TAB
            inventoryManager.close();
            break;
        case 17: // TAB
            // ControlPressed = true;
            break;
    }
});
