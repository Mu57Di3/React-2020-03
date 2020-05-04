import React from "react";
import classNames from "classnames";
import { BaseProps, ButtonTypes, ButtonColors } from "Constants/ui";

interface ButtonProps extends BaseProps {
    type?: ButtonTypes;
    onClick?: () => void;
    disabled?: boolean;
    sm?: boolean;
    lg?: boolean;
    outline?: boolean;
    submit?: boolean;
    textColor?: ButtonColors;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = ButtonTypes.primary,
    onClick,
    disabled,
    sm = false,
    lg = false,
    outline = false,
    submit = false,
    textColor,
}) => {
    const onClickHandler = (): void => {
        if (onClick) {
            onClick();
        }
    };

    const style = classNames([
        "btn",
        outline ? type.replace("btn-", "btn-outline-") : type,
        { "btn-sm": !!sm },
        { "btn-lg": !!lg },
        textColor || "",
    ]);

    return (
        <button className={style} disabled={disabled} type={submit ? "submit" : "button"} onClick={onClickHandler}>
            {children}
        </button>
    );
};

const ButtonGroup: React.FC<{}> = ({ children }) => {
    return (
        <div className="btn-group" role="group">
            {children}
        </div>
    );
};

function withSetType<T extends ButtonProps>(Component: React.ComponentType<T>, type: ButtonTypes) {
    return function SetTypeWrapper(props: T) {
        return <Component type={type} {...props} />;
    };
}

const LinkButton = withSetType(Button, ButtonTypes.link);

export { Button, LinkButton, ButtonGroup };
