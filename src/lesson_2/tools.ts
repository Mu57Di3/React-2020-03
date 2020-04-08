import { Token } from "./parser";

/**
 * Проверка на тип данных число
 * @param value
 */
export const isNumber = (value: string): boolean => {
    return value !== " " && !isNaN(Number(value));
};

/**
 * Преобразует дерево токенов в строку
 * @param tree
 */
export const treeToString = (tree: Array<Token>): string => {
    let output = "";

    tree.forEach((item) => {
        if (item.type !== "Quote") {
            output += String(item.number || item.operator);
        } else {
            output += treeToString(item.children);
        }
    });

    return output;
};
