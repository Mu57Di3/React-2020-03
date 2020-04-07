import { Machine } from "../src/lesson_2/parser";

describe("Тест парсера срок", () => {
    const parser = new Machine();
    it("10 + 2", () => {
        expect(parser.run("10 + 2").length).toBe(3);
    });
    it("4*- 2", () => {
        expect(parser.run("4*- 2").length).toBe(3);
    });
    it("2 * ( 3 + 2 )", () => {
        expect(parser.run("2 * ( 3 + 2 )").length).toBe(3);
    });
    it("2 * ( 3 * (1 + 9) )", () => {
        expect(parser.run("2 * ( 3 * (1 + 9) )").length).toBe(3);
    });
    it("2 * (3 *(1 +9))", () => {
        expect(parser.run("2 * (3 *(1 +9))").length).toBe(3);
    });
    it("3**", () => {
        expect(parser.run("3**").length).toBe(2);
    });
    it("3** +2", () => {
        expect(parser.run("3** + 2").length).toBe(4);
    });
});
