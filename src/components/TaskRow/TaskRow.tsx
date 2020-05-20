import React from "react";
import { States } from "Constants/ToDo";
import { ButtonColors } from "Constants/ui";
import { StateBtn } from "Components";
import _ from "lodash";

interface Props {
    id: number;
    label: string;
    state?: States;
    click: (id: number) => void;
    cancel?: (id: number) => void;
}

const getColor = (state: States): string => {
    switch (state) {
        case States.Complete:
            return ButtonColors.green;
        case States.Canceled:
            return ButtonColors.gray;
        default:
            return ButtonColors.blue;
    }
};

const TaskRow: React.FC<Props> = ({ id, label, state = States.Active, click, cancel }) => {
    const clickHandler = (): void => {
        click(id);
    };
    const cancelHandler = (): void => {
        if (_.isFunction(cancel)) {
            cancel(id);
        }
    };
    const color: string = getColor(state);

    return (
        <div className="col-12">
            <StateBtn state={state} click={clickHandler} color={color} />
            {label}
            {state === States.Active && (
                <StateBtn state={States.Cancel} color={ButtonColors.red} click={cancelHandler} />
            )}
        </div>
    );
};

export { TaskRow };
