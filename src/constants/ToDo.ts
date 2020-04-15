/**
 * Состояния кнопки они же для задания
 */
export enum States {
    Active,
    Complete,
    Canceled,
    Cancel,
}

/**
 * Тип описывающий объект задачи
 */
export type Task = {
    id: number;
    state: States;
    label: string;
};

/**
 * Цвета кнопок класс bootstrap
 */
export enum ButtonColors {
    red = "text-danger",
    blue = "text-primary",
    gray = "text-secondary",
    green = "text-success",
    yellow = "text-warning",
    black = "text-dark",
}
