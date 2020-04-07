import * as _ from "lodash";

export type ScalarOperationType = (val1: number, val212: number) => number;

export const OperatorPriority: { [key: string]: number } = {
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

const factorial: ScalarOperationType = (val: number): number => {
    return val != 1 ? val * factorial(val - 1, 1) : 1;
};

export const MathOperations: { [key: string]: ScalarOperationType } = {
    "*": (val1, val2) => {
        return val1 * (val2 || 1);
    },

    "/": (val1, val2) => {
        return val1 / (val2 || 1);
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

    "!": (val: number): number => {
        return factorial(val, 1);
    },
};
