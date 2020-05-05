import React from "react";
import { Task, States } from "Constants/ToDo";
import _ from "lodash";
import { TaskRow } from "Components";

interface Props {
    list: Task[];
    click: (id: number) => void;
    filter: States | null;
    cancel: (id: number) => void;
}

const EmptyList: React.FC<{}> = () => {
    return <div className="col-12 text-center">Нет задач</div>;
};

const TasksList: React.FC<Props> = ({ list, click, filter = null, cancel }) => {
    const clickHandler = (id: number): void => {
        click(id);
    };
    const cancelHandler = (id: number): void => {
        cancel(id);
    };
    const drawList: Element[] = list
        .filter((item) => {
            return _.isNull(filter) ? true : item.state === filter;
        })
        .map((task) => <TaskRow key={`task-${task.id}`} {...task} click={clickHandler} cancel={cancelHandler} />);
    return <div className="row">{drawList.length ? drawList : <EmptyList />}</div>;
};

export { TasksList };
