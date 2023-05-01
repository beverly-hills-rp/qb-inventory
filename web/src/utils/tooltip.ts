import { TooltipComponent } from "@components/tooltip/tooltip.component";
import { Tooltip } from "@lib";

const tooltips: Tooltip[] = [];

export const destroyTooltips = () => {
    tooltips.forEach((tooltip) => tooltip.destroy());
    tooltips.splice(0, tooltips.length);
};

export const setupTooltip = () => {
    tooltips.forEach((tooltip) => tooltip.destroy());
    tooltips.splice(0, tooltips.length);

    const tooltip = new Tooltip({
        selector: ".item",
        tooltipBuilder: (element) => {
            return TooltipComponent({
                itemLabel: element.getAttribute("data-label") ?? "",
                itemDescription: element.getAttribute("data-description") ?? "",
                itemImage: element.getAttribute("data-image") ?? "",
                itemWeight: Number(element.getAttribute("data-weight")) ?? 0.0,
                itemAmount: Number(element.getAttribute("data-amount")) ?? 0,
                itemTags: element.getAttribute("data-item-tags"),
                itemInfo: element.getAttribute("data-item-info"),
            });
        },
    });

    tooltips.push(tooltip);
};
