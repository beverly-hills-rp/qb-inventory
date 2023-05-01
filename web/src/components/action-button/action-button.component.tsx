import { createElement } from "@lib";
import { Icon } from "@components/icon/icon.component";

import './action-button.component.scss';

export interface ButtonProps {
    icon: string;
    action: string;
    size?: number;
}

export const ActionButtonComponent = (props: ButtonProps) => {
    const { icon, action, size } = props;

    return (
        <button className="action-button">
            <Icon path={icon} size={size ?? 1.8} color={'white'} />
        </button>
    )
}
