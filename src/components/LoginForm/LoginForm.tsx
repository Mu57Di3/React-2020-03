import React from "react";
import { FormGenerator } from "UI";
import { FormResultType, InputTypes } from "Constants/ui";

interface Props {
    submit?: (email: string, password: string) => void;
}

const LoginForm: React.FC<Props> = ({ submit }) => {
    const submitLabel = "Войти";
    const formConfig = [
        { type: InputTypes.email, name: "email", required: true, placeholder: "Введите email" },
        { type: InputTypes.password, name: "password", required: true, placeholder: "Введите пароль" },
    ];
    const submitHandler = (result: FormResultType): void => {
        if (submit) {
            submit(result.email as string, result.password as string);
        }
    };
    return <FormGenerator controls={formConfig} onSubmit={submitHandler} submitLabel={submitLabel} />;
};

export { LoginForm };
