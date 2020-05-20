import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { LoginForm } from "Components";
import { login } from "@/api/auth";

const LoginScreen: React.FC<{}> = () => {
    const history = useHistory();
    const loginHandler = async (email: string, password: string) => {
        const result = await login(email, password);
        if (result) {
            history.push("/");
        } else {
            alert("Нет такого пользователя");
        }
    };
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <LoginForm submit={loginHandler} />
            </div>
        </div>
    );
};

export { LoginScreen };
