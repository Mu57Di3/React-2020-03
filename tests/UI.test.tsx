import React from "react";
import { mount, render, shallow } from "enzyme";
import { InputTypes } from "Constants/ui";
import { FormGenerator } from "UI";

describe("Компонент FormGenerator", () => {
    it("Генерация разных типов контролов", () => {
        const config = [
            { type: InputTypes.text },
            { type: InputTypes.password },
            { type: InputTypes.email },
            { type: InputTypes.date },
            { type: InputTypes.color },
            { type: InputTypes.number },
        ];
        const form = render(<FormGenerator controls={config} />);
        const result = [];
        result.push(form.find("input[type=text]").length);
        result.push(form.find("input[type=password]").length);
        result.push(form.find("input[type=email]").length);
        result.push(form.find("input[type=date]").length);
        result.push(form.find("input[type=color]").length);
        result.push(form.find("input[type=number]").length);
        expect(result).toStrictEqual([1, 1, 1, 1, 1, 1]);
    });

    it("Атрибуты контрола", () => {
        const config = [{ type: InputTypes.text, name: "field1", placeholder: "Введите строку", data: "test" }];
        const form = render(<FormGenerator controls={config} />);
        expect(form.find("input[name=field1]").length).toBe(1);
        expect(form.find("input[placeholder='Введите строку']").length).toBe(1);
        expect(form.find("input[data=test]").length).toBe(1);
    });
});
