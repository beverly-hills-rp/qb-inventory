import { InventoryType } from "src/shared/enums/InventoryType";
import { event, setupDnD } from "@utils";
import { inventoryManager } from "src";

const inputValue = 1;

export default event('drop', async ({ log }, event: any) => {
    const source = event.detail.element as HTMLElement;
    const target = event.detail.targetElement as HTMLElement;
    const parent = event.detail.parentElement as HTMLElement;

    if (!source || !target || source == target) return;

    const name = source.getAttribute('data-name');
    const amount = source.getAttribute('data-amount');
    const unique = source.getAttribute('data-unique') == "true";


    if (target.childNodes.length > 0) {
        const targetItem = target.querySelector<HTMLElement>('.item');

        if (targetItem) {
            const targetAmount = targetItem.getAttribute('data-amount');
            const targetName = targetItem.getAttribute('data-name');

            if (targetName === name && !unique) {
                const newAmount = parseInt(amount!) - inputValue < 0 ? parseInt(amount!) : parseInt(amount!) - inputValue;

                if (newAmount > 0) {
                    source.setAttribute('data-amount', newAmount.toString());
                    source.querySelector<HTMLElement>('.quantity')!.innerText = newAmount.toString();

                    parent.appendChild(source);
                } else {
                    source.remove();
                }

                const newTargetAmount = parseInt(targetAmount!) + inputValue;

                targetItem.setAttribute('data-amount', newTargetAmount.toString());
                targetItem.querySelector<HTMLElement>('.quantity')!.innerText = newTargetAmount.toString();

                setupDnD();

                return;
            } else {
                const switchItem = targetItem.cloneNode(true) as HTMLElement;

                targetItem.remove();

                target.appendChild(source);
                parent.appendChild(switchItem);

                setupDnD();

                return;
            }
        }
    }

    if (amount && parseInt(amount) > inputValue) {
        const newAmount = parseInt(amount) - inputValue;

        source.setAttribute('data-amount', newAmount.toString());

        const newItem = source.cloneNode(true) as HTMLElement;

        newItem.setAttribute('data-amount', String(inputValue));

        source.querySelector<HTMLElement>('.quantity')!.innerText = newAmount.toString();
        newItem.querySelector<HTMLElement>('.quantity')!.innerText = String(inputValue);

        target.appendChild(newItem);
        parent.appendChild(source);

        setupDnD();
    } else {
        target.appendChild(source);
        // updateDnDParents();
    }

});
