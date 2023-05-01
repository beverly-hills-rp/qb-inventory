import { Draggable } from "@lib";
import { event, setupDnD, setupTooltip } from "@utils";


export default event('rendered', async ({ log }, event) => {
    setupDnD();
    setupTooltip();
});
