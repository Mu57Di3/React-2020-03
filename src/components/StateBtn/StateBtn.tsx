import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonColors, States } from "../../constants/ToDo";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    state: States;
    click: () => void;
    color?: string;
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
    const classes = `btn btn-link ${color}`;
    return (
        <button className={classes} disabled={disabled} onClick={clickHandler}>
            <FontAwesomeIcon icon={icons[state]} />
        </button>
    );
};

export default StateBtn;
