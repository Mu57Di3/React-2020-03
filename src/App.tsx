import React, { useCallback, useEffect, useState } from "react";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import { AutorizedMain, EmptyScreen, LockScreen, LoginScreen, LogoutScreen, RegisterScreen } from "@/screens";
import { getAuthorizedData, isLoggedIn } from "@/api/auth";

const App: React.FC<{}> = () => {
    const history = useHistory();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLock, setIsLock] = useState(true);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (!isAuthorized) {
            (async () => {
                const result = await isLoggedIn();
                setIsAuthorized(result);
                if (result) {
                    const data = await getAuthorizedData();
                    setUserData(data);
                }
                setIsLock(false);
            })();
        } else {
            (async () => {
                const data = await getAuthorizedData();
                setUserData(data);
                setIsLock(false);
            })();
        }
    }, []);
    useEffect(() => {
        return history.listen((location, action) => {
            setIsLock(true);
            (async () => {
                const result = await isLoggedIn();
                setIsAuthorized(result);
                if (result) {
                    const data = await getAuthorizedData();
                    setUserData(data);
                }
                setIsLock(false);
            })();
        });
    });
    return (
        <>
            <header className="mb-3 mt-3">
                <nav>
                    <ul className="nav nav-pills justify-content-center">
                        {isAuthorized ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/" exact={true} className="nav-link" activeClassName="active">
                                        Главная
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/logout" exact={true} className="nav-link" activeClassName="active">
                                        Выход
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" exact={true} className="nav-link" activeClassName="active">
                                        Вход
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/signup" exact={true} className="nav-link" activeClassName="active">
                                        Регистрация
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            <main>
                <div className="container">
                    {isLock ? (
                        <LockScreen />
                    ) : (
                        <Switch>
                            <Route path="/signup">
                                <RegisterScreen />
                            </Route>
                            <Route path="/login">
                                <LoginScreen />
                            </Route>
                            <Route path="/logout">
                                <LogoutScreen />
                            </Route>
                            <Route exact path="/">
                                {isAuthorized ? (
                                    <AutorizedMain name={userData ? userData.name : ""} />
                                ) : (
                                    <LoginScreen />
                                )}
                            </Route>
                            <Route>
                                <EmptyScreen />
                            </Route>
                        </Switch>
                    )}
                </div>
            </main>
        </>
    );
};

export { App };
