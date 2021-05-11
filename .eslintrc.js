module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'jest',
        'node',
        'promise',
        'standard'],
    extends: [
        'eslint:all',
        'plugin:@typescript-eslint/all',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jest/all',
        'plugin:node/recommended',
        'plugin:promise/recommended',
        'standard-with-typescript',
    ],
    globals: {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    root: true,
    env: {
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/indent': [
            'error',
            2,
        ],
        '@typescript-eslint/no-magic-numbers': [
            'off',
        ],
        '@typescript-eslint/no-shadow': [
            'off',
        ],
        'no-duplicate-imports': [
            'off',
        ],
        'sort-imports': [
            'error',
            {
                'ignoreDeclarationSort': true,
            },
        ],
        '@typescript-eslint/no-type-alias': [
            'error',
            {
                'allowAliases': 'always',
                'allowConditionalTypes': 'always',
            },
        ],
        '@typescript-eslint/prefer-readonly-parameter-types': [
            'off',
        ],
        '@typescript-eslint/semi': [
            'error',
            'always',
        ],
        '@typescript-eslint/typedef': [
            'off',
        ],
        'array-bracket-newline': [
            'error',
            'consistent',
        ],
        'array-element-newline': [
            'error',
            'consistent',
        ],
        'function-call-argument-newline': [
            'error',
            'consistent',
        ],
        'function-paren-newline': [
            'error',
            'consistent',
        ],
        'id-length': [
            'error',
            {
                'exceptions': [
                    'x',
                    'y',
                ],
            },
        ],
        'max-len': [
            'error',
            120,
        ],
        'max-lines': [
            'off',
        ],
        'max-lines-per-function': [
            'off',
        ],
        'max-statements': [
            'off',
        ],
        'multiline-comment-style': [
            'error',
            'separate-lines',
        ],
        'multiline-ternary': [
            'error',
            'always-multiline',
        ],
        'newline-per-chained-call': [
            'error',
            {
                'ignoreChainWithDepth': 3,
            },
        ],
        'no-console': [
            'off',
        ],
        'no-sync': [
            'off',
        ],
        'no-ternary': [
            'off',
        ],
        'node/no-missing-import': [
            'error',
            {
                'tryExtensions': [
                    '.js',
                    '.ts',
                    '.json',
                    '.node',
                ],
            },
        ],
        '@typescript-eslint/quotes': [
            'error',
            'single',
        ],
        'node/no-unsupported-features/es-syntax': [
            'error',
            {
                'ignores': [
                    'modules',
                ],
            },
        ],
        'semi': [
            'error',
            'always',
        ],
        'sort-keys': [
            'error',
            'asc',
            {
                'minKeys': 5,
                'natural': true,
            },
        ],
    },
    overrides: [
        {
            'files': [
                '*.js',
            ],
            'rules': {
                '@typescript-eslint/no-require-imports': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
            },
        },
    ],
};
