import { LOGIN_KEY, USERS_LIST_KEY } from "Constants/ToDo";
import _ from "lodash";

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * авторизация
 * @param email
 * @param password
 */
export const login = async (email: string, password: string) => {
    await sleep(1000);
    const hash = `${email}:${password}`;
    let users = await localStorage.getItem(USERS_LIST_KEY);
    users = JSON.parse(users || "{}");
    if (users && _.has(users, email) && users[email].password === hash) {
        await localStorage.setItem(LOGIN_KEY, email);
        return true;
    } else {
        return false;
    }
};

export const getAuthorizedData = async () => {
    const key = await localStorage.getItem(LOGIN_KEY);
    let users = await localStorage.getItem(USERS_LIST_KEY);
    users = JSON.parse(users || "{}");
    return users[key] || {};
};

/**
 * регистрация
 * @param name
 * @param email
 * @param password
 */
export const signup = async (name: string, email: string, password: string) => {
    await sleep(1000);
    const hash = `${email}:${password}`;
    let users = await localStorage.getItem(USERS_LIST_KEY);
    users = JSON.parse(users || "{}");
    if (users[email]) {
        return false;
    } else {
        users[email] = {
            name: name,
            email: email,
            password: hash,
        };
    }
    await localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
    return true;
};

/**
 * выход
 */
export const logout = async () => {
    await sleep(1000);
    await localStorage.removeItem(LOGIN_KEY);
};

/**
 * проверка авторизован ли пользователь
 */
export const isLoggedIn = async () => {
    await sleep(1000);
    const login = await localStorage.getItem(LOGIN_KEY);
    return !!login;
};
