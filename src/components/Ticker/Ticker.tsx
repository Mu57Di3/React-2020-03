import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Div = styled("div")`
    font-size: 16px;
    white-space: pre-wrap;
    font-family: monospace;
`;

interface Props {
    text: string;
    size?: number;
    timeout?: number;
}

export const getOffsetString = (string: string, counter: number, size: number): string => {
    let startString: string = string;
    if (string.length >= size) {
        startString += " ";
    } else {
        startString = string.padEnd(size, " ");
    }
    const offset = counter - Math.floor(counter / startString.length) * startString.length;
    let outPut = startString.substr(offset, size);
    outPut += startString.substr(0, size - outPut.length);
    return outPut;
};

const Ticker: React.FC<Props> = ({ text, size = 10, timeout = 1000 }) => {
    const [offset, setOffset] = useState(0);
    let intervalId: NodeJS.Timeout;

    useEffect(() => {
        if (!intervalId) {
            intervalId = setInterval(() => {
                setOffset(offset + 1);
            }, timeout);
        }
        return (): void => {
            clearInterval(intervalId);
        };
    });
    return <Div>{getOffsetString(text, offset, size)}</Div>;
};

export { Ticker };
