export const fixInventoryStruct = (inventory) => {
    if (!inventory)
        return null;

    if (typeof inventory == "object")
        inventory = Object.values(inventory)

    return inventory;
};
