import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    add: (task: string) => void;
}

const AddTask: React.FC<Props> = ({ add }) => {
    const taskLabel = useRef(null);
    const addHandler = (): void => {
        const label = taskLabel.current.value || "";
        if (label.length) {
            add(label);
            taskLabel.current.value = "";
        }
    };

    const keyUpHandler = (event: KeyboardEvent): void => {
        if (event.key == "Enter") {
            addHandler();
        }
    };

    return (
        <div className="input-group mb-3">
            <input
                ref={taskLabel}
                type="text"
                className="form-control"
                placeholder="Введите новую задачу"
                onKeyUp={keyUpHandler}
            />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={addHandler}>
                    <FontAwesomeIcon icon={["fas", "plus-circle"]} />
                </button>
            </div>
        </div>
    );
};

export default AddTask;
