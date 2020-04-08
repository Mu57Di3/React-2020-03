import { Calc, PolishCalc } from "../src/lesson_2/calculator";
import { Machine } from "../src/lesson_2/parser";
import { ShuntingYard } from "../src/lesson_2/shunting_yard";

describe("Тест калькулятора обычного", () => {
    const parser = new Machine();
    it("2+3", () => {
        expect(Calc(parser.run("2+3")).number).toBe(5);
    });
    it("(2+2)*2", () => {
        const tree = parser.run("(2+2)*2");
        expect(Calc(tree).number).toBe(8);
    });
    it("2+ 2* 2", () => {
        const tree = parser.run("2+ 2* 2");
        expect(Calc(tree).number).toBe(6);
    });
    it("3** +2", () => {
        const tree = parser.run("3** +2");
        expect(Calc(tree).number).toBe(11);
    });
    it("5! +2", () => {
        const tree = parser.run("5! +2");
        expect(Calc(tree).number).toBe(122);
    });

    it("(2 +3 )**", () => {
        const tree = parser.run("(2 +3 )**");
        expect(Calc(tree).number).toBe(25);
    });

    it("(2 *(3+1))^ 3 +-5", () => {
        const tree = parser.run("(2 *(3+1))^ 3 +-5");
        expect(Calc(tree).number).toBe(507);
    });

    it("2!+11", () => {
        const tree = parser.run("2!+11");
        expect(() => {
            Calc(tree);
        }).toThrow(TypeError("Ошибка в выражении возможно пропущен пробел между операциями."));
    });

    it("2! +11", () => {
        const tree = parser.run("2! +11");
        expect(Calc(tree).number).toBe(13);
    });
});

describe("Тест польской нотации", () => {
    it("22+-2", () => {
        const tree = ShuntingYard("22+-2");
        expect(PolishCalc(tree).number).toBe(20);
    });

    it("(2+2)*2", () => {
        const tree = ShuntingYard("(2+2)*2");
        expect(PolishCalc(tree).number).toBe(8);
    });

    it("2+ 2* 2", () => {
        const tree = ShuntingYard("2+ 2* 2");
        expect(PolishCalc(tree).number).toBe(6);
    });
    it("5! +2", () => {
        const tree = ShuntingYard("5! +2");
        expect(PolishCalc(tree).number).toBe(122);
    });
    it("(2 *(3+1))^ 3 +-5", () => {
        const tree = ShuntingYard("(2 *(3+1))^ 3 +-5"); //231+*^3-5+
        expect(PolishCalc(tree).number).toBe(507);
    });

    it("2!+11", () => {
        const tree = ShuntingYard("2! + 11");
        expect(PolishCalc(tree).number).toBe(13);
    });
});
