import { Machine } from "../src/lesson_2/parser";
import { treeToString } from "../src/lesson_2/tools";

describe("Тест парсера срок", () => {
    const parser = new Machine();
    it("10 + 2", () => {
        expect(treeToString(parser.run("10 + 2"))).toBe("10+2");
    });
    it("4*- 2", () => {
        expect(treeToString(parser.run("4*- 2"))).toBe("4*-2");
    });
    it("2 * ( 3 + 2 )", () => {
        expect(treeToString(parser.run("2 * ( 3 + 2 )"))).toBe("2*3+2");
    });
    it("2 * ( 3 * (1 + 9) )", () => {
        expect(treeToString(parser.run("2 * ( 3 * (1 + 9) )"))).toBe("2*3*1+9");
    });
    it("2 * (3 *(1 +9))", () => {
        expect(treeToString(parser.run("2 * (3 *(1 +9))"))).toBe("2*3*1+9");
    });
    it("3**", () => {
        expect(treeToString(parser.run("3**"))).toBe("3**");
    });
    it("3** +2", () => {
        expect(treeToString(parser.run("3** + 2"))).toBe("3**+2");
    });
});
