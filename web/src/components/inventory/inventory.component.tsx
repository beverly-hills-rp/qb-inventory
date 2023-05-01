import { createElement, createFragment } from '@lib';
import { getItemInfo, getItemTags } from '@helpers';
import { InventoryType } from '@enum/InventoryType';
import { InventoryItem } from 'src/inventory-manager';

import './inventory.style.scss';

export interface InventoryProps {
    id: string;
    title: string;
    slots: number;
    items: Array<InventoryItem | null>;
    type: InventoryType;
    hasKeybindings?: boolean;
    maxWeight?: number;
    closeInventory?: () => void;
    useItem?: (item: any) => void;
    dropItem?: (item: any) => void;
    giveItem?: (item: any) => void;
}

interface SlotProps {
    slot: number;
    item?: InventoryItem;
    hasKeybindings?: boolean;
}

export const InventoryComponent = (props: InventoryProps) => {
    const { id, type, title, items, slots, hasKeybindings, maxWeight } = props;

    // array of items that are not null
    const mappedItems = items.reduce((accumulator, item) => {
        if (item != null) accumulator[item.slot] = item;

        return accumulator;
    }, {});

    let weight = 0.0;

    for (const item of items) {
        if (item !== null) {
            weight += item.weight * item.amount;
        }
    }

    const canShowWeight = maxWeight != undefined && type != InventoryType.Dropped && type != InventoryType.Shop;

    return (
        <div className="inventory" dataId={id} dataType={type}>
            <div className="header">
                <div className="grid">
                    <div className="row">
                        <div className="title">
                            <p>{title}</p>
                        </div>
                    </div>
                    <div className="row">
                        {canShowWeight ? (
                            <>
                                <div className="weight">
                                    <p>
                                        {(weight / 1000).toFixed(2)}/{(maxWeight / 1000).toFixed(2)}
                                    </p>
                                </div>

                                <ProgressBar value={weight} max={maxWeight} />
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            <div className="grid">
                {Array(slots)
                    .fill(0)
                    .map((_, i) => {
                        const index = i + 1;
                        const item = mappedItems[index];

                        return <Slot slot={index} item={item} hasKeybindings={hasKeybindings} />;
                    })}
            </div>
        </div>
    );
};

export const ProgressBar = (props: any) => {
    const { value, max } = props;

    const percentage = (value / max) * 100;

    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export const Slot = (props: SlotProps) => {
    const { slot, item, hasKeybindings } = props;

    const itemImage = item != undefined ? require(`@assets/images/${item.image}`).default : null;

    return (
        <div className="slot droppable" dataSlot={slot} dataType={'slot'}>
            {item != undefined ? (
                <div
                    className="item"
                    style={{ backgroundImage: `url(${itemImage})` }}
                    dataType="item"
                    dataAmount={item.amount}
                    dataLabel={item.label}
                    dataUnique={item.unique}
                    dataDescription={item.description}
                    dataImage={itemImage}
                    dataWeight={item.weight}
                    dataItemInfo={getItemInfo(item)}
                    dataItemTags={getItemTags(item).join(';')}
                >
                    <span className="quantity">{item.amount}</span>

                    {item.price != undefined ? <span className="price">&nbsp;{item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span> : ''}
                </div>
            ) : (
                ''
            )}
            {hasKeybindings && slot <= 5 ? <span className="key">{slot}</span> : ''}
        </div>
    );
};
