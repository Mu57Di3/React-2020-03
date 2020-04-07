import * as _ from "lodash";
export const OperatorPriority = {
    "+": 4,
    "-": 4,
    "*": 3,
    "/": 3,
    "^": 2,
    "**": 2,
    "!": 2,
    "(": 1,
};

export const getOperatorsByPriority = (priority: number): Array<string> => {
    return _.chain(OperatorPriority)
        .pickBy((val: number): boolean => {
            return val === priority;
        })
        .keys()
        .value();
};

export const MathOperations = {
    "*": (val1: number, val2: number): number => {
        return val1 * val2;
    },
    "/": (val1: number, val2: number): number => {
        return val1 / val2;
    },
    "-": (val1: number, val2: number): number => {
        return val1 - val2;
    },
    "+": (val1: number, val2: number): number => {
        return val1 + val2;
    },
    "^": (val1: number, val2: number): number => {
        return Math.pow(val1, val2);
    },
    "**": (val: number): number => {
        return Math.pow(val, 2);
    },
};
