import React, { forwardRef } from "react";
import { BaseProps, InputTypes } from "Constants/ui";

interface InputProps extends BaseProps {
    type?: InputTypes;
    value?: string;
    placeholder?: string;
}

function withSetType<T extends InputProps>(Component: React.ComponentType<T>, type: InputTypes) {
    const WrappedComponent = (props: InputProps) => {
        const { forwardedRef, ...otherProps } = props;
        return <Component type={type} ref={forwardedRef} {...otherProps} />;
    };

    // eslint-disable-next-line react/display-name
    return forwardRef((props, ref) => {
        return <WrappedComponent forwardedRef={ref} />;
    });
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { type, value, ...otherProps } = props;
    return <input className="form-control" ref={ref} type={type} value={value} {...otherProps} />;
});
Input.displayName = "Input";

const TextInput = withSetType(Input, "text");
TextInput.displayName = "TextInput";

export { Input, TextInput };
