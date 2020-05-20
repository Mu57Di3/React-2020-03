import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { States } from "Constants/ToDo";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { LinkButton } from "UI";
import { ButtonColors } from "Constants/ui";

interface Props {
    state: States;
    click: () => void;
    color?: ButtonColors;
    disabled?: boolean;
}

const icons: { [key: string]: IconProp } = {
    [States.Active]: ["far", "circle"],
    [States.Complete]: ["far", "check-circle"],
    [States.Canceled]: ["far", "play-circle"],
    [States.Cancel]: ["far", "times-circle"],
};

const StateBtn: React.FC<Props> = ({ state, click, color = ButtonColors.blue, disabled = false }) => {
    const clickHandler = (): void => {
        click();
    };
    return (
        <LinkButton textColor={color} disabled={disabled} onClick={clickHandler}>
            <FontAwesomeIcon icon={icons[state]} />
        </LinkButton>
    );
};

export { StateBtn };
