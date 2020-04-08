import * as _ from "lodash";
import { isNumber } from "./tools";
import { Token } from "./parser";

const operations: { [key: string]: number } = { "*": 1, "/": 1, "+": 1, "-": 1, "^": 1, "!": 1 };
const leftAssoc: { [key: string]: number } = { "*": 1, "/": 1, "+": 1, "-": 1, "^": 1 };
const rightAssoc: { [key: string]: number } = { "!": 1 };

const priority: { [key: string]: number } = {
    "!": 3,

    "*": 2,
    "/": 2,
    "^": 2,

    "+": 1,
    "-": 1,
};

/**
 * Преобразует строку в прямой нотации в обратную польскую в виде дерева токенов.
 * @param query
 */
export const ShuntingYard = (query: string): Array<Token> => {
    const stack: Array<Token> = [];
    const output: Array<Token> = [];
    const task = query.trim().split("");
    let previousToken: string;

    task.forEach((token: string): void => {
        if (token === " ") {
            return;
        }
        if (isNumber(token)) {
            if (isNumber(previousToken)) {
                const lastOut: Token = _.last(output) || new Token();
                lastOut.number = parseFloat(String(lastOut.number) + token);
            } else if (previousToken === "-") {
                const lastOut: Token = _.last(output) || new Token();
                if (lastOut.operator === "-" && lastOut.number === 0) {
                    lastOut.number = parseFloat(token) * -1;
                    lastOut.operator = "";
                } else {
                    output.push(new Token("Number", parseFloat(token)));
                }
            } else {
                output.push(new Token("Number", parseFloat(token)));
            }
        } else if (token === "-" && (_.has(operations, previousToken) || !previousToken)) {
            output.push(new Token("Number", 0, "-"));
        } else if (_.has(operations, token)) {
            while (stack.length) {
                const lastOp: Token = _.last(stack) || new Token();
                if (
                    lastOp.type === "Operator" &&
                    ((_.has(leftAssoc, token) && priority[token] <= priority[lastOp.operator]) ||
                        (_.has(rightAssoc, token) && priority[token] < priority[lastOp.operator]))
                ) {
                    output.push(stack.pop() || new Token());
                } else {
                    break;
                }
            }

            stack.push(new Token("Operator", null, token));
        } else if (token === "(") {
            stack.push(new Token("Quote", null, token));
        } else if (token === ")") {
            let hasLeftParent = false;
            while (stack.length) {
                const item: Token = stack.pop() || new Token();
                if (item.type === "Quote" && item.operator === "(") {
                    hasLeftParent = true;
                    break;
                } else {
                    output.push(item);
                }
            }

            if (!hasLeftParent) {
                throw new Error("Незакрытые круглые скобки.");
            }

            //stack.pop();
        } else {
            throw new Error("Неизвестный оператор: " + token);
        }
        previousToken = token;
    });

    while (stack.length) {
        const token: Token = stack.pop() || new Token();
        if (token.type === "Quote") {
            throw new Error("Незакрытые круглые скобки.");
        }

        output.push(token);
    }

    return output;
};
