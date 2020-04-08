import { ShuntingYard } from "../src/lesson_2/shunting_yard";
import {treeToString} from "../src/lesson_2/tools";

describe("Тесты преобразования в польскую нотацию", () => {
    it("2 + 2", () => {
        expect(treeToString(ShuntingYard("2 + 2"))).toBe("22+");
    });

    it("2 + 2 * 2", () => {
        expect(treeToString(ShuntingYard("2 + 2 * 2"))).toBe("222*+");
    });

    it("(2 + 2) * 2", () => {
        expect(treeToString(ShuntingYard("(2 + 2) * 2"))).toBe("22+2*");
    });
});
