import React, { MutableRefObject, ReactNode } from "react";

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

export enum EButtonTypes {
    "primary" = "#007bff",
    "secondary" = "#6c757d",
    "success" = "#28a745",
    "danger" = "#dc3545",
    "warning" = "#ffc107",
    "info" = "#17a2b8",
    "light" = "#f8f9fa",
    "dark" = "#343a40",
    "link" = "link",
}

export enum InputTypes {
    text = "text",
    number = "number",
    date = "date",
    color = "color",
    password = "password",
    email = "email",
}

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

export interface FormConfigItem {
    type: InputTypes;
    name?: string;
    placeholder?: string;
    required?: boolean;
    ref?: React.MutableRefObject<HTMLInputElement>;
}

export interface FormItem {
    type: InputTypes;
    name: string;
    placeholder?: string;
    required?: boolean;
    ref: React.MutableRefObject<HTMLInputElement> | React.MutableRefObject<null>;
}

export interface FormResultType {
    [key: string]: string | number | boolean;
}
