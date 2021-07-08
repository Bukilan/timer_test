module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'prettier',
    ],
    globals: {
        window: true,
        document: true,
    },
    rules: {
        'no-console': 'warn',
        'react/prop-types': 0, // не использую prop-types
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'no-use-before-define': 'off', // бага в react-scripts
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-unused-vars': 'off', // иначе ts ругается синтаксис в interface
        '@typescript-eslint/no-unused-vars': ['error'],
        'import/extensions': 'off', // не понимает импорты без расширения
        'import/no-unresolved': 'off', // не понимает экспорты через index
        "object-curly-spacing": ["warn", "always"], // пробелы в фигурных скобках
        "arrow-body-style": ["warn", "always"]  // не применять укороченный return стрелочных функций
    },
};
