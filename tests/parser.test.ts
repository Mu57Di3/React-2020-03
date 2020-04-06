import { Machine } from "../src/lesson_2/parser";

test("Тест парсера срок", () => {
    const parser = new Machine();
    expect(parser.run("1 + 2").length).toBe(3);
    expect(parser.run("2 * ( 3 + 2 )").length).toBe(3);
    expect(parser.run("2 * ( 3 * (1 + 9) )").length).toBe(3);
});
