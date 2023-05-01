import { createElement, createFragment } from "@lib";

import './tooltip.component.scss';

interface TooltipProps {
    itemLabel: string;
    itemDescription: string;
    itemWeight: number;
    itemAmount: number;
    itemImage: string;
    itemTags?: string | null;
    itemInfo?: string | null;
}

export const TooltipComponent = (props: TooltipProps) => {

    const tags = props.itemTags?.split(';');

    return (
        <div className="tooltip-content">
            <div className="tooltip-header">
                <div className="item-image"
                    style={{ backgroundImage: `url(${props.itemImage})` }}
                >
                </div>
                <div className="item-label">
                    {props.itemLabel}
                </div>
            </div>
            <div className="tooltip-info">
                {
                    props.itemInfo && props.itemInfo.replace(/\\n/g, "\n")
                }
                Peso: {props.itemWeight / 1000}Kg
            </div>
            <div className="tooltip-tags">
                {
                    tags?.map((tag, index) => {
                        return (
                            <div className="tag" key={index}>
                                {tag}
                            </div>
                        )
                    })
                }
            </div>
            <div className="tooltip-description">
                {props.itemDescription}
            </div>
            <div className="tooltip-footer">
                <div className="item-weight">
                    <span>{(props.itemWeight * props.itemAmount) / 1000}Kg</span>
                </div>
            </div>
        </div>
    )
};
