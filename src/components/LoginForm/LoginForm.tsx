import React, { createRef } from "react";
import { Button, EmailInput, Form, PasswordInput } from "UI";

interface Props {
    submit?: (email: string, password: string) => void;
}

const LoginForm: React.FC<Props> = ({ submit }) => {
    const emailRef = createRef(null);
    const passwordRef = createRef(null);
    const submitHandler = (): void => {
        const emailInput = emailRef.current;
        const passwordInput = passwordRef.current;
        if (submit && emailInput && passwordInput) {
            submit(emailInput.value, passwordInput.value);
        }
    };
    return (
        <Form onSubmit={submitHandler}>
            <div className="form-group">
                <EmailInput placeholder="email" required ref={emailRef} />
            </div>
            <div className="form-group">
                <PasswordInput placeholder="password" required ref={passwordRef} />
            </div>
            <div className="form-group">
                <Button submit>ОК</Button>
            </div>
        </Form>
    );
};

export { LoginForm };
