import React, { FormEvent } from "react";

interface Props {
    onSubmit?: () => void;
}

const Form: React.FC<Props> = ({ children, onSubmit, ...otherProps }) => {
    const submitHandler = (e: FormEvent) => {
        if (onSubmit) {
            e.preventDefault();
            onSubmit();
        }
    };
    return (
        <form onSubmit={submitHandler} {...otherProps}>
            {children}
        </form>
    );
};

export { Form };
