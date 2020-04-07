export const isNumber = (value: string): boolean => {
    return value !== " " && !isNaN(Number(value));
};
