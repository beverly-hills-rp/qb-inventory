import { createElement } from "@lib";

import './inventory-actions.component.scss';
import { ActionButtonComponent } from "@components/action-button/action-button.component";
import { mdiSend } from "@mdi/js";

interface InventoryActionsProps {
    quantityHandler: (quantity: number) => void;
}

//input callback props.quantityHandler
export const InventoryActionsComponent = (props: InventoryActionsProps) => {
    return (
        <div className="actions">
            <ActionButtonComponent
                icon={mdiSend}
                action={""}
                size={1.4}
            />
            <input type="number" placeholder="QTD" onChange={(e: any) => props.quantityHandler(Number(e.target.value ?? 0))} />
        </div>
    )
}
