import React from "react";
import { select, text, boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import TaskRow from "../src/components/TaskRow";
import { Task, States, ButtonColors } from "../src/constants/ToDo";
import TasksList from "../src/containers/TasksList";
import StateBtn from "../src/components/StateBtn";
import ToDoApp from "../src/containers/ToDoApp";
import AddTask from "../src/components/AddTask";

library.add(fab, far, fas);

export default {
    title: "ToDo app",
    decorators: [withKnobs],
};

const tasks: Task[] = [
    { id: 1, label: "Первое", state: States.Active },
    { id: 2, label: "Второе", state: States.Canceled },
    { id: 3, label: "Третье", state: States.Complete },
];

export const StateBtnComponent: React.FC<{}> = () => {
    const stateOption = {
        Активная: States.Active,
        Отмененая: States.Canceled,
        Завершенная: States.Complete,
        Отметить: States.Cancel,
    };
    const colorsOption = {
        red: ButtonColors.red,
        blue: ButtonColors.blue,
        gray: ButtonColors.gray,
        green: ButtonColors.green,
        yellow: ButtonColors.yellow,
        black: ButtonColors.black,
    };
    const taskState = select("Иконка", stateOption, States.Active);
    const isDisabled = boolean("Disable", false);
    const color = select("Цвет", colorsOption, ButtonColors.blue);
    return <StateBtn state={taskState} click={action("click")} disabled={isDisabled} color={color} />;
};

export const TaskRowComponent: React.FC<{}> = () => {
    const label = text("Label", "Что-нибудь сделать");
    const stateOption = {
        Активная: States.Active,
        Отмененая: States.Canceled,
        Завершенная: States.Complete,
    };
    const taskState = select("Состояние", stateOption, States.Active);
    return (
        <TaskRow id={1} label={label} state={taskState} click={action("state-change")} cancel={action("cancel-task")} />
    );
};

export const TasksListComponent: React.FC<{}> = () => {
    const stateOption = {
        Активная: States.Active,
        Отмененая: States.Canceled,
        Завершенная: States.Complete,
        Все: null,
        "Не одной": 1000,
    };
    const taskState = select("Фильтр", stateOption, null);
    return <TasksList list={tasks} click={action("state-change")} filter={taskState} cancel={action("cancel-task")} />;
};

export const AddTaskComponent: React.FC<{}> = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <AddTask add={action("add-task")} />
            </div>
        </div>
    );
};

export const TodoAppContaner: React.FC<{}> = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <ToDoApp />
                </div>
            </div>
        </div>
    );
};
