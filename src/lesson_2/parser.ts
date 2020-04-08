import { isNumber } from "./tools";
import * as _ from "lodash";

export type EnumTypes = "Number" | "Operator" | "Quote";
export const postfixOperators = ["!", "**"];
export const binOperators = ["+", "-", "/", "*", "^"];
type States = "Start" | "Run" | "Number" | "Quote" | "QuoteClose" | "Operator";

/**
 * Класс прототип токена
 */
export class Token {
    type: EnumTypes = "Number";
    number = 0;
    operator = "";
    children: Array<Token> = [];
    separated?: boolean = false;
    constructor(type?: EnumTypes, value?: number | null, operator?: string | null) {
        this.type = type || "Number";
        this.number = value || 0;
        this.operator = operator || "";
    }
}

/**
 * Машина рабора строки на дерево токенов.
 */
export class Machine {
    tree: Array<Token> = [];
    state: States = "Start";

    /**
     * Запускает токенизацию.
     * @param command - считанная скрока команды
     */
    run(command: string): Array<Token> {
        this.tree = [];
        this.state = "Start";
        //const prepareCommand: string = command.toLocaleLowerCase().replace(/\s+/g, "");
        const prepareCommand: string = command.toLocaleLowerCase();
        return this.parse(prepareCommand.split(""));
    }

    /**
     * Автомат формирующий дерево токенов
     * @param symbolsArray
     */
    parse(symbolsArray: Array<string>): Array<Token> {
        const linkArray: Array<Array<object>> = [this.tree];
        symbolsArray.forEach((token: string): void => {
            const newTokenObject = new Token();
            const currentLink = _.last(linkArray);
            const lastAdded: Token | null = (_.last(currentLink) as Token) || null;
            this.setState(token, lastAdded ? lastAdded.number || lastAdded.operator : null);
            newTokenObject.type = this.getType(token);
            switch (this.state) {
                case "Quote":
                    newTokenObject.operator = "(";
                    (currentLink as Array<object>).push(newTokenObject);
                    linkArray.push((_.last(currentLink) as Token).children);
                    break;
                case "QuoteClose":
                    linkArray.pop();
                    break;
                case "Number":
                    if (lastAdded && lastAdded.type === "Number") {
                        lastAdded.number = parseFloat(String(lastAdded.number) + token);
                        if (lastAdded.operator === "-") {
                            lastAdded.number *= -1;
                            lastAdded.operator = "";
                        }
                    } else {
                        if (token === "-") {
                            newTokenObject.operator = "-";
                        } else {
                            newTokenObject.number = parseFloat(token);
                        }
                        (currentLink as Array<object>).push(newTokenObject);
                    }
                    break;
                case "Operator":
                    if (lastAdded && !lastAdded.separated && lastAdded.type === "Operator") {
                        lastAdded.operator += token;
                    } else {
                        newTokenObject.operator = token;
                        (currentLink as Array<object>).push(newTokenObject);
                    }
                    break;
                default:
                    if (lastAdded) {
                        lastAdded.separated = true;
                    }
                    break;
            }
        });
        return this.tree;
    }

    /**
     * Устанавливает состояние парсера
     * @param token - текущий символ
     * @param lastAdded - значение последнего обработанного токена
     */
    setState(token: string, lastAdded: string | number | null): void {
        if (isNumber(token)) {
            this.state = "Number";
        } else if (this.state != "Number" && token === "-") {
            this.state = "Number";
        } else if (token === "(") {
            this.state = "Quote";
        } else if (token === ")") {
            this.state = "QuoteClose";
        } else if (postfixOperators.indexOf(lastAdded + token) > -1) {
            this.state = "Operator";
        } else if (token !== " ") {
            this.state = "Operator";
        } else {
            this.state = "Run";
        }
    }

    /**
     * Возвращает тип токена
     * @param token
     */
    getType(token: string): EnumTypes {
        if (isNumber(token) || (this.state === "Number" && token === "-")) {
            return "Number";
        } else if (["(", ")"].indexOf(token) > -1) {
            return "Quote";
        } else {
            return "Operator";
        }
    }
}
