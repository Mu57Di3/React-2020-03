import React from "react";
import { FormResultType, InputTypes } from "Constants/ui";
import { FormGenerator } from "UI";

interface Props {
    submit?: (name: string, email: string, password: string) => void;
}

const RegisterForm: React.FC<Props> = ({ submit }) => {
    const submitLabel = "Зарегистрироваться";
    const formConfig = [
        { type: InputTypes.text, name: "name", required: true, placeholder: "Введите Имя" },
        { type: InputTypes.email, name: "email", required: true, placeholder: "Введите email" },
        { type: InputTypes.password, name: "password", required: true, placeholder: "Введите пароль" },
    ];
    const submitHandler = (result: FormResultType): void => {
        if (submit) {
            submit(result.name as string, result.email as string, result.password as string);
        }
    };
    return <FormGenerator controls={formConfig} onSubmit={submitHandler} submitLabel={submitLabel} />;
};

export { RegisterForm };
