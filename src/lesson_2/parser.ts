import { isNumber } from "./tools";
import * as _ from "lodash";

type EnumTypes = "Number" | "Operator" | "Quote";
type BinOperators = "*" | "-" | "/" | "+" | "^";
type UnoOperators = "!";
type States = "Run" | "Quote" | "QuoteClose";

/**
 * Класс прототип токена
 */
class Token {
    type: EnumTypes = "Number";
    value: number | string = "";
    children: Array<object> = [];
}

/**
 * Машина рабора строки на дерево токенов.
 */
export class Machine {
    tree: Array<object> = [];
    state: States = "Run";

    /**
     * Запускает токенизацию.
     * @param command - считанная скрока команды
     */
    run(command: string): Array<object> {
        this.tree = [];
        this.state = "Run";
        return this.parse(command.trim().toLocaleLowerCase().split(" "));
    }

    parse(symbolsArray: Array<string>): Array<object> {
        const linkArray: Array<Array<object>> = [this.tree];
        symbolsArray.forEach((token: string): void => {
            const newTokenObject = new Token();
            const currentLink = _.last(linkArray);
            this.setState(token);
            newTokenObject.type = this.getType(token);
            switch (this.state) {
                case "Quote":
                    (currentLink as Array<any>).push(newTokenObject);
                    linkArray.push((_.last(currentLink) as Token).children);
                    break;
                case "QuoteClose":
                    linkArray.pop();
                    break;
                default:
                    newTokenObject.value = token;
                    (currentLink as Array<any>).push(newTokenObject);
                    break;
            }
        });
        return this.tree;
    }

    /**
     * Устанавливает состояние парсера
     * @param token
     */
    setState(token: string): void {
        if (token === "(") {
            this.state = "Quote";
        } else if (token === ")") {
            this.state = "QuoteClose";
        } else {
            this.state = "Run";
        }
    }

    /**
     * Возвращает тип токена
     * @param token
     */
    getType(token: string): EnumTypes {
        if (isNumber(token)) {
            return "Number";
        } else if (["(", ")"].indexOf(token) > -1) {
            return "Quote";
        } else {
            return "Operator";
        }
    }
}
