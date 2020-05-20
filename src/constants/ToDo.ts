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
