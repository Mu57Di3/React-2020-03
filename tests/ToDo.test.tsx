import React from "react";
import { shallow } from "enzyme";

import TaskRow from "../src/components/TaskRow";

describe("Компонент TaskRow", () => {
    it("Без настроек", () => {
        expect(shallow(<TaskRow label={"Тест"} />).matchesElement(<div>Тест</div>)).toBe(true);
    });
});
