import { InventoryItem } from "src/inventory-manager";

export const isShopStockEmpty = (itemCount: number | undefined, inventoryType: string) => {
    if (inventoryType === 'shop' && itemCount !== undefined && itemCount === 0) return true;

    return false;
};


export const getItemTags = (item: InventoryItem) => {
    const tags: string[] = [];

    if (!item) return tags;

    if (item.useable) tags.push('Usável');
    if (item.unique) tags.push('Único');
    if (item.type == 'weapon') tags.push('Arma');

    return tags;
}

export const getItemInfo = (item: InventoryItem) => {
    var info = '';

    if (!item || !item.info || Array.isArray(item.info)) return info;

    if (item.info.citizenid) info += `ID: ${item.info.citizenid}\\n`;
    if (item.info.firstname) info += `Nome: ${item.info.firstname} ${item.info.lastname}\\n`;
    if (item.info.serie) info += `Série: ${item.info.serie}\\n`;
    if (item.info.gender) info += `Gênero: ${item.info.gender == 0 ? 'Masculino' : 'Feminino'}\\n`;
    if (item.info.nationality) info += `Nacionalidade: ${item.info.nationality}\\n`;
    if (item.info.birthdate) info += `Data de Nascimento: ${item.info.birthdate}\\n`;
    if (item.info.street) info += `Endereço: ${item.info.street}\\n`;
    if (item.info.name) info += `Nome: ${item.info.name}\\n`;
    if (item.info.cardNumber) info += `Número do Cartão: ${item.info.cardNumber}\\n`;
    if (item.info.cardType) info += `Tipo de Cartão: ${item.info.cardType}\\n`;
    if (item.info.cardActive) info += `Cartão Ativo: ${item.info.cardActive}\\n`;
    if (item.info.cardPin) info += `PIN do Cartão: ${item.info.cardPin}\\n`;
    if (item.info.ammolabel) info += `Tipo de Munição: ${item.info.ammolabel}\\n`;
    if (item.info.ammotype) info += `Tipo de Munição: ${item.info.ammotype}\\n`;

    return info;
}
