import React, { ReactNode } from "react";

/**
 * Размеры контролов формы
 */
export enum FormControlSizes {
    large = "form-control-lg",
    medium = "",
    small = "form-control-sm",
}

/**
 * Цвета текста
 */
export enum TextColors {
    red = "text-danger",
    blue = "text-primary",
    gray = "text-secondary",
    green = "text-success",
    yellow = "text-warning",
    black = "text-dark",
}

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

/**
 * Тип кнопок
 */
export enum ButtonTypes {
    "primary" = "btn-primary",
    "secondary" = "btn-secondary",
    "success" = "btn-success",
    "danger" = "btn-danger",
    "warning" = "btn-warning",
    "info" = "btn-info",
    "light" = "btn-light",
    "dark" = "btn-dark",
    "link" = "btn btn-link",
}

export type InputTypes = "text" | "number" | "date" | "color" | "password" | "email";

/**
 * Базовый интерфейс для компонентов
 */
export interface BaseProps {
    children?: ReactNode;
    forwardedRef?:
        | ((instance: HTMLInputElement | null) => void)
        | React.MutableRefObject<HTMLInputElement | null>
        | null;
}
