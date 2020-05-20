import React, { useCallback } from "react";
import { RegisterForm } from "Components";
import { useHistory } from "react-router-dom";
import { signup } from "@/api/auth";

const RegisterScreen: React.FC<{}> = () => {
    const history = useHistory();
    const registerHandler = useCallback(async (name, email, password) => {
        await signup(name, email, password);
        history.push("/");
    }, []);
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <RegisterForm submit={registerHandler} />
            </div>
        </div>
    );
};

export { RegisterScreen };
