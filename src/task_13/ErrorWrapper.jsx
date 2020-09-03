import React, { Component } from "react";

class ErrorWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Возникли ошибки.</h1>;
        }
        return this.props.children;
    }
}

export { ErrorWrapper };
