import React from "react";
import { States, Task } from "../../constants/ToDo";
import AddTask from "../../components/AddTask";
import TasksList from "../TasksList";

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

    public render(): React.ReactNode {
        const { list } = this.state;

        return (
            <div className="row  bg-light pt-3 pb-3">
                <div className="col-12">
                    <AddTask add={this.addTaskHandler} />
                </div>
                <div className="col-12 pb-2">
                    <div className="card">
                        <div className="card-header">Активные задачи</div>
                        <div className="card-body">
                            <TasksList
                                list={list}
                                click={this.setStateHandler}
                                filter={States.Active}
                                cancel={this.cancelTaskHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 pb-2">
                    <div className="card">
                        <div className="card-header">Отложенные задачи</div>
                        <div className="card-body">
                            <TasksList
                                list={list}
                                click={this.setStateHandler}
                                filter={States.Canceled}
                                cancel={this.cancelTaskHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">Выполненные</div>
                        <div className="card-body">
                            <TasksList
                                list={list}
                                click={this.setStateHandler}
                                filter={States.Complete}
                                cancel={this.cancelTaskHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToDoApp;
