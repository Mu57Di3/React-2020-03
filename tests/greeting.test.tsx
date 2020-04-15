import React from "react";
import { shallow } from "enzyme";

import Greeting from "../src/components/greeting";

describe("Тест компонента Greeting", () => {
    it("Default", () => {
        expect(shallow(<Greeting />).matchesElement(<span>Доброго времени суток, Пользователь</span>)).toBe(true);
    });

    it("С настройками", () => {
        expect(
            shallow(<Greeting username={"Bender"} />).matchesElement(<span>Доброго времени суток, Bender</span>)
        ).toBe(true);
    });
});
