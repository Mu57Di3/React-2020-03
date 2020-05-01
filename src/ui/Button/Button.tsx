import React from "react";
import classNames from "classnames";
import { BaseProps, ButtonTypes } from "Constants/ui";

interface ButtonProps extends BaseProps {
    type?: ButtonTypes;
    onClick?: () => void;
    disabled?: boolean;
    sm?: boolean;
    lg?: boolean;
}

interface LinkButtonProps extends BaseProps {
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = ButtonTypes.primary,
    onClick,
    disabled,
    sm = false,
    lg = false,
}) => {
    const onClickHandler = (): void => {
        if (onClick) {
            onClick();
        }
    };

    const style = classNames(["btn", type, { "btn-sm": !!sm }, { "btn-lg": !!lg }]);

    return (
        <button className={style} disabled={disabled} onClick={onClickHandler}>
            {children}
        </button>
    );
};

const LinkButton: React.FC<LinkButtonProps> = ({ children, ...otherProps }) => {
    return (
        <Button type={ButtonTypes.link} {...otherProps}>
            {children}
        </Button>
    );
};

const ButtonGroup: React.FC<{}> = ({ children }) => {
    return (
        <div className="btn-group" role="group">
            {children}
        </div>
    );
};

export { Button, LinkButton, ButtonGroup };
