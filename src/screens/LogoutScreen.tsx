import React, { useEffect } from "react";
import { LockScreen } from "@/screens/LockScreen";
import { useHistory } from "react-router-dom";
import { logout } from "@/api/auth";

const LogoutScreen: React.FC<{}> = () => {
    const history = useHistory();
    useEffect(() => {
        (async () => {
            await logout();
            history.push("/");
        })();
    });
    return <LockScreen />;
};

export { LogoutScreen };
