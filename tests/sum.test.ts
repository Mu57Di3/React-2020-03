import { sum } from "../src/funcs";

test("сложение", () => {
    expect(sum(1, 2)).toBe(3);
});
