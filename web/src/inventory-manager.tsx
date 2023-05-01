import { CharacterComponent } from '@components/character/character.component';
import { InventoryActionsComponent } from '@components/inventory/actions/inventory-actions.component';
import { InventoryComponent } from '@components/inventory/inventory.component';
import { VanillaDom, createElement } from '@lib';
import { fetchNui } from './utils/fetchNui';
import { InventoryType } from './shared/enums/InventoryType';
import { destroyDnD, destroyTooltips, setupDnD, setupTooltip } from '@utils';

type InventoryMovement = {
    slot?: string;
    item?: InventoryItem;
    inventory: Inventory;
    element?: {
        item?: HTMLElement;
        inventory: HTMLElement;
        slot?: HTMLElement;
    };
};

export interface InventoryResponse {
    slots: number;
    maxammo: MaxAmmo;
    action: string;
    Ammo: any[];
    maxweight: number;
    inventory: Array<InventoryItem | null>;
    other: Other;
}

export interface Other {
    coords: Coords;
    slots: number;
    maxweight: number;
    label: string;
    inventory: Array<InventoryItem | null>;
    name: number | string;
}

export interface Coords {
    x: number;
    y: number;
    z: number;
}

export class MaxAmmo {
    public rifle: number;
    public pistol: number;
    public shotgun: number;
    public smg: number;

    constructor() {
        this.rifle = 0;
        this.pistol = 0;
        this.shotgun = 0;
        this.smg = 0;
    }
}

export class Attachment {
    public label: string;
    public component: string;

    constructor() {
        this.label = '';
        this.component = '';
    }

    public deserialize(data: any) {
        Object.assign(this, data);

        return this;
    }
}

export class ItemInfo {
    public gender?: number;
    public nationality?: string;
    public lastname?: string;
    public citizenid?: string;
    public firstname?: string;
    public birthdate?: string | Date;
    public type?: string;
    public serie?: string;
    public attachments?: Attachment[];
    public ammo?: number;
    public quality?: number;
    public cardNumber?: number;
    public name?: string;
    public cardType?: string;
    public cardActive?: boolean;
    public cardPin?: number;
    public ammolabel?: string;
    public street?: string;
    public label?: string;
    public ammotype?: number;

    constructor() {
        this.gender = undefined;
        this.nationality = undefined;
        this.lastname = undefined;
        this.citizenid = undefined;
        this.firstname = undefined;
        this.birthdate = undefined;
        this.type = undefined;
        this.serie = undefined;
        this.attachments = undefined;
        this.ammo = undefined;
        this.quality = undefined;
        this.cardNumber = undefined;
        this.name = undefined;
        this.cardType = undefined;
        this.cardActive = undefined;
        this.cardPin = undefined;
        this.ammolabel = undefined;
        this.street = undefined;
        this.label = undefined;
        this.ammotype = undefined;
    }

    public deserialize(data: any) {
        Object.assign(this, data);

        if (data.attachments)
            this.attachments = data.attachments.map((attachment: any) => new Attachment().deserialize(attachment));

        return this;
    }
}

export class InventoryItem {
    public id?: number;
    public description: string;
    public slot: number;
    public useable: boolean;
    public label: string;
    public unique: boolean;
    public price?: number;
    public name: string;
    public image: string;
    public amount: number;
    public shouldClose?: boolean;
    public info?: ItemInfo | [];
    public weight: number;
    public type: 'item' | 'weapon';

    constructor() {
        this.id = undefined;
        this.description = '';
        this.slot = -1;
        this.useable = false;
        this.label = '';
        this.unique = false;
        this.price = undefined;
        this.name = '';
        this.image = '';
        this.amount = 0;
        this.shouldClose = false;
        this.info = undefined;
        this.weight = 0;
        this.type = 'item';
    }

    public updateItem(item: InventoryItem) {
        this.id = item.id;
        this.description = item.description;
        this.slot = item.slot;
        this.useable = item.useable;
        this.label = item.label;
        this.unique = item.unique;
        this.name = item.name;
        this.image = item.image;
        this.amount = item.amount;
        this.shouldClose = item.shouldClose;
        this.info = item.info;
        this.weight = item.weight;
        this.type = item.type;
    }

    public deserialize(data: any) {
        Object.assign(this, data);

        if (data.info) this.info = new ItemInfo().deserialize(data.info);

        return this;
    }
}

export class Inventory {
    public inventoryId: string;
    public type: InventoryType;
    public label: string;
    public slots: number;
    public items: Array<InventoryItem | null>;
    public maxWeight: number;
    public maxAmmo: MaxAmmo;

    constructor(type: InventoryType) {
        this.inventoryId = '0';
        this.type = type;
        this.label = '';

        this.slots = 35;
        this.items = [];

        this.maxWeight = 0;
        this.maxAmmo = {
            pistol: 0,
            rifle: 0,
            shotgun: 0,
            smg: 0,
        };
    }

    public getInventoryComponent() {
        return (
            <InventoryComponent
                id={String(this.inventoryId)}
                type={this.type}
                title={this.getInventoryName()}
                slots={this.slots}
                items={this.items}
                maxWeight={this.maxWeight}
                hasKeybindings={this.type == InventoryType.Player}
            />
        );
    }

    private getInventoryName(): string {
        switch (this.type) {
            case InventoryType.Player:
                return 'Inventário';
            case InventoryType.Dropped:
                return 'Chão';
            case InventoryType.Trunk:
                return 'Porta-malas';
            case InventoryType.GloveBox:
                return 'Porta-luvas';
            case InventoryType.Stash:
                return 'Depósito';
            case InventoryType.Shop:
                return this.label ?? 'Loja';
            default:
                throw new Error(`Unsupported inventory type '${this.type}'`);
        }
    }

    public getItem(slot: number): InventoryItem | null | undefined {
        return this.items.find((item) => item?.slot === slot);
    }

    public removeItem(slot: number): void {
        this.items = this.items.filter((item) => item?.slot !== slot);
    }

    public getFreeSlot(): number {
        for (let i = 1; i <= this.slots; i++) {
            if (!this.getItem(i)) {
                return i;
            }
        }

        return -1;
    }
}

export class InventoryManager {
    private playerInventory: Inventory;
    private otherInventory?: Inventory;

    private quantitySelected: number;

    constructor() {
        this.quantitySelected = 0;

        this.playerInventory = new Inventory(InventoryType.Player);
    }

    public open(): void {
        this.render();
    }

    public async close(): Promise<void> {
        VanillaDom.unmountComponentAtNode(document.getElementById('root')!);

        destroyTooltips();
        destroyDnD();

        await fetchNui('CloseInventory', JSON.stringify({}));
    }

    public render(): void {
        VanillaDom.render(
            <div className="container">
                <InventoryActionsComponent quantityHandler={(quantity) => (this.quantitySelected = quantity)} />
                {this.playerInventory.getInventoryComponent()}
                <CharacterComponent />
                {this.otherInventory!.getInventoryComponent()}
            </div>,
            document.getElementById('root')!
        );
    }

    public setData(data: InventoryResponse): void {
        this.playerInventory.inventoryId = 'player';
        this.playerInventory.slots = data.slots;
        this.playerInventory.maxWeight = data.maxweight;
        this.playerInventory.items = data.inventory;
        this.playerInventory.maxAmmo = data.maxammo;
        this.playerInventory.items = data.inventory
            .filter((item) => item !== null)
            .map((item) => new InventoryItem().deserialize(item));

        if (!this.otherInventory || !data.other) this.otherInventory = new Inventory(InventoryType.Dropped);

        if (!data.other) return;

        this.otherInventory.inventoryId = data.other.name.toString();
        this.otherInventory.type = getInventoryType(data.other.name as string);
        this.otherInventory.label = data.other.label;
        this.otherInventory.slots = data.other.slots;
        this.otherInventory.maxWeight = data.other.maxweight;
        this.otherInventory.items = data.other.inventory
            ?.filter((item) => item !== null)
            ?.map((item) => new InventoryItem().deserialize(item));
    }

    // Handle drag and drop inventory item events
    // identify the event source inventory and the target inventory (check if the source is this.playerInventory or this.otherInventory);
    // if it is the same inventory:
    // - move item to empty slot (if target is empty slot)
    // - concatenate items if the item is of the same type (and if the item is not unique)
    // - when moving to a slot with a different item do a slot swap with the target (ex: item in slot 9 moved to item in slot 7, item in slot 9 goes to slot 7 and the item that was in slot 7 goes to slot 9)
    public handleDnD(
        event: MouseEvent,
        element: HTMLElement,
        targetElement: HTMLElement,
        parentElement: HTMLElement
    ): void {
        const source = element;
        const sourceSlotElement = parentElement;
        const targetSlotElement = targetElement;

        if (!source || !targetSlotElement || sourceSlotElement == targetSlotElement) return;

        const sourceSlot = sourceSlotElement.getAttribute('data-slot')!;
        const targetSlot = targetSlotElement.getAttribute('data-slot')!;

        const sourceInventoryElement = sourceSlotElement.closest('.inventory') as HTMLElement;
        const targetInventoryElement = targetSlotElement.closest('.inventory') as HTMLElement;

        const sourceInventory =
            sourceInventoryElement.getAttribute('data-id') == this.playerInventory.inventoryId
                ? this.playerInventory
                : this.otherInventory!;
        const targetInventory =
            targetInventoryElement.getAttribute('data-id') == this.playerInventory.inventoryId
                ? this.playerInventory
                : this.otherInventory!;

        const sourceItem = sourceInventory.getItem(Number(sourceSlot));
        if (!sourceItem) return;

        const sourceInventoryMovement = {
            slot: sourceSlot,
            item: sourceItem,
            inventory: sourceInventory,
            element: {
                item: source,
                inventory: sourceInventoryElement,
                slot: sourceSlotElement,
            },
        };

        if (sourceItem.amount < 1) {
            this.rollbackItem(sourceInventoryMovement);
            return
        }

        const targetItem = targetInventory.getItem(Number(targetSlot));
        const targetItemElement = targetSlotElement.querySelector('.item') as HTMLElement;

        const quantitySelected = this.quantitySelected ? this.quantitySelected : 1;

        if (targetItem) {
            if (sourceItem.name == targetItem.name && !sourceItem.unique) {
                this.combineItems(sourceInventoryMovement,
                    {
                        slot: targetSlot,
                        item: targetItem,
                        inventory: targetInventory,
                        element: {
                            item: targetItemElement,
                            inventory: targetInventoryElement,
                            slot: targetSlotElement,
                        },
                    },
                    quantitySelected
                );
            } else if (sourceInventory.inventoryId == targetInventory.inventoryId) {
                this.swapItems(sourceInventoryMovement,
                    {
                        slot: targetSlot,
                        item: targetItem,
                        inventory: targetInventory,
                        element: {
                            item: targetItemElement,
                            inventory: targetInventoryElement,
                            slot: targetSlotElement,
                        },
                    }
                );
            } else {
                this.transactItem(sourceInventoryMovement,
                    {
                        inventory: targetInventory,
                        element: {
                            inventory: targetInventoryElement,
                        },
                    },
                    quantitySelected,
                    targetInventory.type == InventoryType.Shop
                );
            }
        } else {
            if (sourceInventory.inventoryId == targetInventory.inventoryId) {
                this.moveItem(sourceInventoryMovement,
                    {
                        slot: targetSlot,
                        inventory: targetInventory,
                        element: {
                            inventory: targetInventoryElement,
                            slot: targetSlotElement,
                        },
                    },
                    quantitySelected
                );
            } else {
                this.transactItem(sourceInventoryMovement,
                    {
                        slot: targetSlot,
                        inventory: targetInventory,
                        element: {
                            inventory: targetInventoryElement,
                            slot: targetSlotElement,
                        },
                    },
                    quantitySelected,
                    targetInventory.type == InventoryType.Shop
                );
            }
        }

        setupDnD();
        setupTooltip();

        this.setInventoryData(
            sourceInventory.inventoryId,
            targetInventory.inventoryId,
            sourceSlot,
            targetSlot,
            quantitySelected.toString()
        );
    }

    private swapItems(source: InventoryMovement, target: InventoryMovement): void {
        // Save the source item in a temporary variable.
        const tempItem = new InventoryItem().deserialize(source.item);

        // Swap the item in the source slot with the item in the target slot.
        source.item!.deserialize(target.item);
        source.item!.slot = Number(source.slot);

        target.item!.deserialize(tempItem);
        target.item!.slot = Number(target.slot);

        // Store the target element's item node, then remove it from the DOM.
        const tempTargetItemElement = target.element!.item!.cloneNode(true) as HTMLElement;
        target.element!.item!.remove();

        // Move the source element's item node to the target slot.
        target.element!.slot!.appendChild(source.element!.item!);
        // Move the target element's item node to the source slot.
        source.element!.slot!.appendChild(tempTargetItemElement);
    }

    private combineItems(source: InventoryMovement, target: InventoryMovement, amount: number): void {
        // Make sure we're not trying to move more than we have
        amount = amount > source.item!.amount ? source.item!.amount : amount;
        // Make sure we're not trying to move more than we have
        const newAmount = amount > source.item!.amount ? 0 : source.item!.amount - amount;

        // If we're moving all of the items, remove the item from the source inventory
        if (newAmount <= 0) {
            target.item!.amount += source.item!.amount;

            source.inventory.removeItem(Number(source.slot));
            source.element!.item!.remove();
        } else {
            // Otherwise, just reduce the amount of items in the source inventory
            target.item!.amount += amount;
            source.item!.amount -= amount;

            source.element!.item!.setAttribute('data-amount', newAmount.toString());
            source.element!.item!.querySelector<HTMLElement>('.quantity')!.innerText = newAmount.toString();

            this.rollbackItem(source);
        }

        // Update the target item's amount
        target.element!.item!.setAttribute('data-amount', target.item!.amount.toString());
        target.element!.item!.querySelector<HTMLElement>('.quantity')!.innerText = target.item!.amount.toString();
    }

    private moveItem(source: InventoryMovement, target: InventoryMovement, amount: number = 1): void {
        amount = amount > source.item!.amount ? source.item!.amount : amount;
        const newAmount = amount > source.item!.amount || !amount ? 0 : source.item!.amount - amount;

        if (target.slot) {
            if (newAmount <= 0) {
                source.inventory.removeItem(Number(source.slot));

                const newItem = new InventoryItem().deserialize(source.item);
                newItem.slot = Number(target.slot);

                target.inventory.items.push(newItem);
                target.element!.slot!.appendChild(source.element!.item!);
            } else {
                source.item!.amount -= amount;

                source.element!.item!.setAttribute('data-amount', newAmount.toString());
                source.element!.item!.querySelector<HTMLElement>('.quantity')!.innerText = newAmount.toString();

                const newItem = new InventoryItem().deserialize(source.item);
                newItem.amount = amount;
                newItem.slot = Number(target.slot);

                target.inventory.items.push(newItem);

                const newItemElement = source.element!.item!.cloneNode(true) as HTMLElement;
                newItemElement.setAttribute('data-amount', amount.toString());
                newItemElement.querySelector<HTMLElement>('.quantity')!.innerText = amount.toString();

                target.element!.slot!.appendChild(newItemElement);
                source.element!.slot!.appendChild(source.element!.item!);
            }
        } else {
            const freeSlot = target.inventory.getFreeSlot();

            if (freeSlot <= 0) {
                this.rollbackItem(source);
                return;
            }

            source.item!.amount -= amount;

            source.element!.item!.setAttribute('data-amount', newAmount.toString());
            source.element!.item!.querySelector<HTMLElement>('.quantity')!.innerText = newAmount.toString();

            const newItem = new InventoryItem().deserialize(source.item);
            newItem.amount = amount;
            newItem.slot = freeSlot;

            target.inventory.items.push(newItem);

            const newItemElement = source.element!.item!.cloneNode(true) as HTMLElement;
            newItemElement.setAttribute('data-amount', amount.toString());
            newItemElement.querySelector<HTMLElement>('.quantity')!.innerText = amount.toString();

            const targetSlotElement = target.element!.inventory!.querySelector<HTMLElement>(
                `[data-slot="${freeSlot}"]`
            );

            targetSlotElement!.appendChild(newItemElement);
            source.element!.slot!.appendChild(source.element!.item!);
        }
    }

    private transactItem(source: InventoryMovement, target: InventoryMovement, amount: number = 1, isSell: boolean = false): void {
        amount = amount > source.item!.amount ? source.item!.amount : amount;
        const newAmount = amount > source.item!.amount || !amount ? 0 : source.item!.amount - amount;

        const slot = Number(target.slot ?? target.inventory.getFreeSlot());

        if (slot <= 0 && !isSell) {
            this.rollbackItem(source);
            return;
        }

        source.item!.amount -= amount;

        source.element!.item!.setAttribute('data-amount', newAmount.toString());
        source.element!.item!.querySelector<HTMLElement>('.quantity')!.innerText = newAmount.toString();

        const newItem = new InventoryItem().deserialize(source.item);
        newItem.amount = amount;
        newItem.slot = slot;

        target.inventory.items.push(newItem);

        const newItemElement = source.element!.item!.cloneNode(true) as HTMLElement;
        newItemElement.setAttribute('data-amount', amount.toString());
        newItemElement.querySelector<HTMLElement>('.quantity')!.innerText = amount.toString();

        const targetSlotElement =
            target.element!.slot ?? target.element!.inventory!.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

        targetSlotElement?.appendChild(newItemElement);
        source.element!.slot!.appendChild(source.element!.item!);

        if (isSell) {
            source.inventory.removeItem(Number(source.slot!));
            source.element!.item!.remove();
        }
    }

    private rollbackItem(source: InventoryMovement): void {
        source.element!.slot!.appendChild(source.element!.item!);
    }

    private setInventoryData(
        fromInventoryId: string,
        toInventoryId: string,
        fromSlot: string,
        toSlot: string,
        fromAmount: string
    ): void {
        fetchNui('SetInventoryData', {
            fromInventory: fromInventoryId,
            toInventory: toInventoryId,
            fromSlot: fromSlot,
            toSlot: toSlot,
            fromAmount: fromAmount,
        });
    }
}

const getInventoryType = (label?: string): InventoryType => {
    if (!label) {
        throw new Error('Invalid inventory label');
    }

    const inventoryType = label.slice(0, label.indexOf('-')).toLowerCase();
    const inventoryTypeMap = {
        dropped: InventoryType.Dropped,
        itemshop: InventoryType.Shop,
        trunk: InventoryType.Trunk,
        glovebox: InventoryType.GloveBox,
        stash: InventoryType.Stash,
    };

    return inventoryTypeMap[inventoryType] ?? InventoryType.Dropped;
};
