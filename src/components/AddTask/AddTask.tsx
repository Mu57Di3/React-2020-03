import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextInput } from "UI";
import { ButtonTypes } from "Constants/ui";

interface Props {
    add: (task: string) => void;
}

const AddTask: React.FC<Props> = ({ add }) => {
    const taskLabel = useRef(null);
    const addHandler = (): void => {
        const node = taskLabel.current || { value: "" };
        const label = node.value || "";
        if (label.length) {
            add(label);
            node.value = "";
        }
    };

    const keyUpHandler = (e: KeyboardEvent): void => {
        if (e.key == "Enter") {
            addHandler();
        }
    };

    return (
        <div className="input-group mb-3">
            <TextInput ref={taskLabel} placeholder="Введите новую задачу" onKeyUp={keyUpHandler} />
            <div className="input-group-append">
                <Button outline type={ButtonTypes.secondary} onClick={addHandler}>
                    <FontAwesomeIcon icon={["fas", "plus-circle"]} />
                </Button>
            </div>
        </div>
    );
};

export { AddTask };
