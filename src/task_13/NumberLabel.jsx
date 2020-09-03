import React, { Component } from "react";

class NumberLabel extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.number !== nextProps.number;
    }

    render() {
        const { number } = this.props;
        return <h2>{number}</h2>;
    }
}

export { NumberLabel };
