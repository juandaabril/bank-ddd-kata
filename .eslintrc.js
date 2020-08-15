module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended" // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true
    },
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module" // Allows for the use of imports
    },
    rules: {
        "@typescript-eslint/semi": ["error"],
        "@typescript-eslint/no-use-before-define": ["error", { "variables": false, "functions": false, "classes": false }],
        "@typescript-eslint/camelcase": 0
    }
};
