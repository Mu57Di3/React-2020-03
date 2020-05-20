import React, { forwardRef, useRef } from "react";
import { FormConfigItem, FormItem, FormResultType } from "Constants/ui";
import { Button, Form, Input, getInputByType } from "UI";

interface FormProps {
    controls?: FormConfigItem[];
    submitLabel?: string;
    onSubmit?: (result: FormResultType) => void;
}

const FormControl = forwardRef((props, ref) => {
    const { type, ...otherProps } = props;
    const Control = getInputByType(Input, type);
    return (
        <div className="form-group">
            <Control ref={ref} {...otherProps} />
        </div>
    );
});
FormControl.displayName = "FormControl";

const FormGenerator: React.FC<FormProps> = ({ onSubmit, controls = [], submitLabel = "ОК" }) => {
    const controlsConfig: FormItem[] = controls.map(
        (item, index): FormItem => {
            return {
                name: item.name || `control ${index}`,
                ref: item.ref || useRef(null),
                ...item,
            };
        }
    );
    const submitHandler = (): void => {
        const result: { [key: string]: string | number | boolean } = {};
        controlsConfig.forEach((item) => {
            result[item.name] = item ? item.ref.current!.value : "";
        });
        if (onSubmit) {
            onSubmit(result);
        }
    };
    const getControls = (items: FormItem[]): React.ReactElement[] => {
        return items.map((item: FormItem) => {
            return <FormControl key={item.name} ref={item.ref} {...item} />;
        });
    };
    return (
        <Form onSubmit={submitHandler}>
            {getControls(controlsConfig)}
            <div className="form-group">
                <Button submit>{submitLabel}</Button>
            </div>
        </Form>
    );
};

export { FormGenerator };
