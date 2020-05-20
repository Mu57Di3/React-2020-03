import React from "react";
import styled from "@emotion/styled";
import { BaseProps, ButtonColors, EButtonTypes } from "Constants/ui";
import { css } from "@emotion/core";

interface ButtonProps extends BaseProps {
    type?: EButtonTypes;
    onClick?: () => void;
    disabled?: boolean;
    sm?: boolean;
    lg?: boolean;
    outline?: boolean;
    submit?: boolean;
    textColor?: ButtonColors;
}

const getDynamicColorsStyle = (props) => {
    const { disabled, type } = props;
    const style = [];
    if (type == EButtonTypes.link) {
        style.push(css`
            font-weight: 400;
            color: #007bff;
            text-decoration: none;
        `);
    } else {
        style.push(css`
            color: ${[EButtonTypes.warning, EButtonTypes.light].indexOf(type) > -1 ? "#212529" : "#fff"};
            background-color: ${type};
            border-color: ${type};
        `);
    }
    if (disabled) {
        style.push(css`
            opacity: 0.65;
        `);
    }
    return style;
};

const getDynamicSizeStyle = (props) => {
    const { lg, sm } = props;
    if (lg) {
        return css`
            padding: 0.5rem 1rem;
            font-size: 1.25rem;
            line-height: 1.5;
            border-radius: 0.3rem;
        `;
    } else if (sm) {
        return css`
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            line-height: 1.5;
            border-radius: 0.2rem;
        `;
    }

    return css``;
};

const EButton = styled.button`
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        ox-shadow 0.15s ease-in-out;
    ${getDynamicColorsStyle};
    ${getDynamicSizeStyle};
`;

const EButtonGroup = styled.div`
    position: relative;
    display: -ms-inline-flexbox;
    display: inline-flex;
    vertical-align: middle;
    & > ${EButton}:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    & > ${EButton}:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -1px;
    }
`;

const ELinkButton = (props: ButtonProps) => {
    return (
        <EButton as="a" type={EButtonTypes.link} {...props}>
            {props.children}
        </EButton>
    );
};

export { EButton, ELinkButton, EButtonGroup };
