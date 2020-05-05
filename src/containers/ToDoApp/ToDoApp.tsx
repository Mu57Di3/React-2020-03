import React from "react";
import { States, Task } from "Constants/ToDo";
import { AddTask } from "Components";
import { TasksList } from "./components/";

interface State {
    list: Task[];
}

class ToDoApp extends React.Component<{}, State> {
    constructor() {
        super({});
        this.state = {
            list: [],
        };

        this.setStateHandler = this.setStateHandler.bind(this);
        this.addTaskHandler = this.addTaskHandler.bind(this);
        this.cancelTaskHandler = this.cancelTaskHandler.bind(this);
    }

    private getNextState(state: States): number {
        switch (state) {
            case States.Active:
                return States.Complete;
            case States.Canceled:
                return States.Active;
            default:
                return state;
        }
    }

    public setStateHandler(id: number): void {
        const newList: Task[] = [...this.state.list];

        if (newList[id]) {
            newList[id].state = this.getNextState(newList[id].state);
        }

        this.setState({
            list: newList,
        });
    }

    public addTaskHandler(label: string): void {
        const newTask: Task = {
            id: this.state.list.length,
            label: label,
            state: States.Active,
        };

        this.setState({
            list: [...this.state.list, newTask],
        });
    }

    public cancelTaskHandler(id: number): void {
        const newList: Task[] = [...this.state.list];

        if (newList[id]) {
            newList[id].state = States.Canceled;
        }

        this.setState({
            list: newList,
        });
    }

    private getTasksCard(state: States, title: string): React.ReactNode {
        const { list } = this.state;
        return (
            <div className="card">
                <div className="card-header">{title}</div>
                <div className="card-body">
                    <TasksList
                        list={list}
                        click={this.setStateHandler}
                        filter={state}
                        cancel={this.cancelTaskHandler}
                    />
                </div>
            </div>
        );
    }

    componentDidMount(): void {
        this.updateTitle();
    }

    componentDidUpdate(): void {
        this.updateTitle();
    }

    updateTitle(): void {
        const { list } = this.state;
        const activeCount = list.filter((item) => {
            return item.state === States.Active;
        }).length;
        document.title = ` ${activeCount || 0} активных заданий`;
    }

    public render(): React.ReactNode {
        return (
            <div className="row  bg-light pt-3 pb-3">
                <div className="col-12">
                    <AddTask add={this.addTaskHandler} />
                </div>
                <div className="col-12 pb-2">{this.getTasksCard(States.Active, "Активные задачи")}</div>
                <div className="col-12 pb-2">{this.getTasksCard(States.Canceled, "Отложенные задачи")}</div>
                <div className="col-12">{this.getTasksCard(States.Complete, "Выполненные")}</div>
            </div>
        );
    }
}

export { ToDoApp };
