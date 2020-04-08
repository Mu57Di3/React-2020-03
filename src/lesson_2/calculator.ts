import * as _ from "lodash";
import { Machine, Token, postfixOperators, binOperators } from "./parser";
import { ShuntingYard } from "./shunting_yard";
import { getOperatorsByPriority, MathOperations } from "./math";

export const Calc = (tree: Array<Token>, priority = 1): Token => {
    const operations: Array<string> = getOperatorsByPriority(priority);
    const output: Array<Token> = tree.reduce((result: Array<Token>, item: Token) => {
        const lastItem = _.last(result);
        if (item.type === "Operator" && operations.includes(item.operator)) {
            if (postfixOperators.includes(item.operator) && lastItem && lastItem.type == "Number") {
                if (_.has(MathOperations, item.operator)) {
                    result[result.length - 1] = new Token("Number", MathOperations[item.operator](lastItem.number, 1));
                }
            } else {
                result.push(item);
            }
        } else if (
            item.type === "Number" &&
            lastItem &&
            lastItem.type === "Operator" &&
            operations.includes(lastItem.operator)
        ) {
            if (binOperators.includes(lastItem.operator as string) && _.has(MathOperations, lastItem.operator)) {
                const firstParam: Token = result[result.length - 2] || null;
                const newToken = new Token("Number", MathOperations[lastItem.operator](firstParam.number, item.number));
                result = result.slice(0, -2);
                result.push(newToken);
            } else {
                throw new Error(`Неизвестный опертор ${lastItem.operator}`);
            }
        } else if (item.type === "Quote") {
            if (_.has(item, "children") && item.children.length) {
                const quoteResult = Calc(item.children, 1);
                if (quoteResult instanceof Token) {
                    result.push(quoteResult);
                } else {
                    throw new Error("Ошибка в оперциях в скобках");
                }
            } else {
                throw new Error("Ошибка обработки скобок");
            }
        } else {
            result.push(item);
        }
        return result;
    }, []);
    if (priority + 1 > 4 && output.length == 1) {
        return output[0];
    } else if (priority + 1 > 4 && output.length > 1) {
        throw new Error("Ошибка в выражении возможно пропущен пробел между операциями.");
    } else {
        return Calc(output, priority + 1);
    }
};

export const PolishCalc = (tree: Array<Token>): Token => {
    const stack: Array<Token> = [];
    tree.forEach((token: Token): void => {
        if (token.type === "Number") {
            stack.push(token);
        } else if (token.type === "Operator") {
            if (postfixOperators.includes(token.operator)) {
                const par: Token = stack.pop() || new Token();
                stack.push(new Token("Number", MathOperations[token.operator](par.number, 1)));
            } else {
                if (stack.length < 2) {
                    throw new Error("Ошибка в выражении");
                }
                const par1: Token = stack.pop() || new Token();
                const par2: Token = stack.pop() || new Token();
                stack.push(new Token("Number", MathOperations[token.operator](par2.number, par1.number)));
            }
        }
    });
    return stack.pop() || new Token();
};

export const actor = (query: string): number => {
    if (!query.length) {
        throw new Error("Введите выражение.");
    }
    const parser = new Machine();
    const tree = parser.run(query);
    if (!tree.length) {
        throw new Error("Ошибка в выражении");
    }
    try {
        return Calc(tree).number;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const polishActor = (query: string): number => {
    if (!query.length) {
        throw new Error("Введите выражение.");
    }

    const tree = ShuntingYard(query);
    if (!tree.length) {
        throw new Error("Ошибка в выражении");
    }
    try {
        return PolishCalc(tree).number;
    } catch (e) {
        throw new Error(e.message);
    }
};
