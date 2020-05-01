import React from "react";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup, LinkButton } from "UI";
import { ButtonTypes } from "Constants/ui";

export default {
    title: "Компоненты UI",
    decorators: [withKnobs],
};

export const UIButton: React.FC<{}> = () => {
    const label = text("Label", "Go 🤟");
    const disabled = boolean("Disabled", false);
    const lg = boolean("Large", false);
    const sm = boolean("Small", false);
    const typesOptions = {
        primary: ButtonTypes.primary,
        secondary: ButtonTypes.secondary,
        success: ButtonTypes.success,
        danger: ButtonTypes.danger,
        warning: ButtonTypes.warning,
        info: ButtonTypes.info,
        light: ButtonTypes.light,
        dark: ButtonTypes.dark,
        link: ButtonTypes.link,
    };
    const type = select("Type", typesOptions, ButtonTypes.primary);
    const objProps: object = {
        lg: lg,
        sm: sm,
    };
    return (
        <>
            <div className="row">
                <div className="col-auto">
                    <Button onClick={action("onClick")} type={type} disabled={disabled} {...objProps}>
                        {label}
                    </Button>
                    <LinkButton onClick={action("onClickLink")} disabled={disabled} {...objProps}>
                        {label}
                    </LinkButton>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <ButtonGroup>
                        <Button onClick={action("onClick1")} type={ButtonTypes.success}>
                            1
                        </Button>
                        <Button onClick={action("onClick2")} type={ButtonTypes.dark}>
                            2
                        </Button>
                        <Button onClick={action("onClick3")} type={ButtonTypes.warning}>
                            3
                        </Button>
                        <Button onClick={action("onClick4")} type={ButtonTypes.link}>
                            4
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </>
    );
};
