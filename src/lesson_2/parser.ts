import { isNumber } from "./tools";
import * as _ from "lodash";

export type EnumTypes = "Number" | "Operator" | "Quote";
const postfixOperators = ["!", "**"];
type States = "Start" | "Run" | "Number" | "Quote" | "QuoteClose" | "Operator";

/**
 * Класс прототип токена
 */
export class Token {
    type: EnumTypes = "Number";
    value: number | string = "";
    children: Array<object> = [];
    separated?: boolean = false;
}

/**
 * Машина рабора строки на дерево токенов.
 */
export class Machine {
    tree: Array<object> = [];
    state: States = "Start";

    /**
     * Запускает токенизацию.
     * @param command - считанная скрока команды
     */
    run(command: string): Array<object> {
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
    parse(symbolsArray: Array<string>): Array<object> {
        const linkArray: Array<Array<object>> = [this.tree];
        symbolsArray.forEach((token: string): void => {
            const newTokenObject = new Token();
            const currentLink = _.last(linkArray);
            const lastAdded: Token | null = (_.last(currentLink) as Token) || null;
            this.setState(token, lastAdded ? lastAdded.value : null);
            newTokenObject.type = this.getType(token);
            switch (this.state) {
                case "Quote":
                    newTokenObject.value = "(";
                    (currentLink as Array<object>).push(newTokenObject);
                    linkArray.push((_.last(currentLink) as Token).children);
                    break;
                case "QuoteClose":
                    linkArray.pop();
                    break;
                case "Number":
                    if (lastAdded && lastAdded.type === "Number") {
                        lastAdded.value += token;
                    } else {
                        newTokenObject.value = token;
                        (currentLink as Array<object>).push(newTokenObject);
                    }
                    break;
                case "Operator":
                    if (lastAdded && !lastAdded.separated && lastAdded.type === "Operator") {
                        lastAdded.value += token;
                    } else {
                        newTokenObject.value = token;
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
