import { MathOperations, getOperatorsByPriority } from "../src/lesson_2/math";

describe("Набот тестов математических операторов", () => {
    it("сложение", () => {
        expect(MathOperations["+"](20, 2)).toBe(22);
    });
    it("вычитание", () => {
        expect(MathOperations["-"](2, 7)).toBe(-5);
    });
    it("умножение", () => {
        expect(MathOperations["*"](7, 3)).toBe(21);
    });
    it("деление", () => {
        expect(MathOperations["/"](15, 3)).toBe(5);
    });
    it("степень", () => {
        expect(MathOperations["^"](3, 7)).toBe(2187);
    });
    it("квадрат", () => {
        expect(MathOperations["**"](3)).toBe(9);
    });
    it("Факториал", () => {
        expect(MathOperations["!"](1)).toBe(1);
        expect(MathOperations["!"](5)).toBe(120);
    });
});

describe("Тест функции полученя набора операций по приоритетам", () => {
    it("Первый приоритет", () => {
        expect(getOperatorsByPriority(1)).toStrictEqual(["("]);
    });
    it("Второй приоритет", () => {
        expect(getOperatorsByPriority(2)).toStrictEqual(["^", "**", "!"]);
    });
});
