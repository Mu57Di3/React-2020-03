import React, { PureComponent } from "react";
import { NumberLabel } from "./NumberLabel";
import { loadNumbers } from "./api";

class Loader extends PureComponent {
    constructor() {
        super();

        this.state = {
            count: 3,
            min: 1,
            max: 10,
            numbers: [],
            autoUpdate: false,
            timer: null,
            needUpdate: false,
        };

        this.updateNumbers = this.updateNumbers.bind(this);
        this.autoUpdateChangeHandler = this.autoUpdateChangeHandler.bind(this);
        this.refreshHandler = this.refreshHandler.bind(this);
    }

    componentDidMount() {
        this.updateNumbers();
    }

    componentDidUpdate() {
        const { needUpdate } = this.state;
        if (needUpdate) {
            this.updateNumbers();
        }
    }

    async updateNumbers() {
        const { count, min, max } = this.state;
        const result = await loadNumbers(count, min, max);
        this.setState({
            numbers: result,
            needUpdate: false,
        });
    }

    autoUpdateChangeHandler() {
        const { timer, autoUpdate } = this.state;
        let timerInstance = null;
        if (timer) {
            clearInterval(timer);
        } else {
            timerInstance = setInterval(() => {
                this.setState({
                    needUpdate: true,
                });
            }, 500);
        }
        this.setState({
            autoUpdate: !autoUpdate,
            needUpdate: !autoUpdate,
            timer: timerInstance,
        });
    }

    refreshHandler() {
        this.updateNumbers();
    }

    componentWillUnmout() {
        const { timer } = this.state;
        if (timer) {
            clearInterval(timer);
        }
    }

    render() {
        const { numbers, autoUpdate } = this.state;
        return (
            <React.Fragment>
                <h1>Случайные числа</h1>
                {numbers.map((number, index) => {
                    return <NumberLabel number={number} key={index} />;
                })}
                <hr />
                <label>
                    <input type="checkbox" checked={autoUpdate} onChange={this.autoUpdateChangeHandler} />
                    Автообновление
                </label>
                {autoUpdate ? null : <button onClick={this.refreshHandler}>Обновить</button>}
            </React.Fragment>
        );
    }
}

export { Loader };
