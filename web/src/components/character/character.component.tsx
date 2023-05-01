import { createElement, createFragment } from "@lib";

import {
    mdiNecklace,
    mdiHatFedora,
    mdiGlasses,
    mdiDominoMask,
    mdiEarbuds,
    mdiTshirtCrew,
    mdiBagPersonal,
    mdiShoeSneaker,
    mdiWatch,
    mdiBoxingGlove,
} from '@mdi/js';

import './character.style.scss';
import { Icon } from "@components/icon/icon.component";
import { jacket, shorts, vest } from "@utils";
import { ActionButtonComponent, ButtonProps } from "@components/action-button/action-button.component";

interface CharacterProps {

}

export const CharacterComponent = (props: CharacterProps) => {
    const leftButtons: ButtonProps[] = [
        { icon: mdiHatFedora, action: '' },
        { icon: mdiGlasses, action: '' },
        { icon: mdiDominoMask, action: '' },
        { icon: mdiEarbuds, action: '', size: 1.6 },
        { icon: mdiNecklace, action: '' },
        { icon: mdiTshirtCrew, action: '' },
    ];

    const rightButtons: ButtonProps[] = [
        { icon: jacket, action: '', size: 1.4 },
        { icon: mdiBagPersonal, action: '' },
        { icon: shorts, action: '', size: 1.6 },
        { icon: mdiShoeSneaker, action: '' },
        { icon: vest, action: '' },
        { icon: mdiWatch, action: '' },
    ];


    return (
        <div className="character-area">
            <div className="side">
                {
                    leftButtons.map((button, i) => {
                        return (
                            <ActionButtonComponent
                                icon={button.icon}
                                action={button.action}
                                size={button.size}
                            />
                        )
                    })
                }
            </div>
            <div className="character"></div>
            <div className="side">
                {
                    rightButtons.map((button, i) => {
                        return (
                            <ActionButtonComponent
                                icon={button.icon}
                                action={button.action}
                                size={button.size}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
