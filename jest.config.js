module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/setupscripts/jestAdaptersSettings.js"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^UI$": "<rootDir>/src/ui/index.tsx",
        "^Components$": "<rootDir>/src/components/index.tsx",
        "^Constants(.*)$": "<rootDir>/src/constants/$1",
    },
};
