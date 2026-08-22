// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const prettier = require('eslint-config-prettier/flat');
// The maintained fork of eslint-plugin-import. The original stops at ESLint 9,
// while eslint-plugin-unicorn now requires 10, so the two cannot coexist.
const importX = require('eslint-plugin-import-x');
const sonarjs = require('eslint-plugin-sonarjs');
// Ships as ESM-only interop, so the configs hang off .default rather than the
// module root the way every other plugin here does.
const unicorn = require('eslint-plugin-unicorn').default;
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.stylistic,
            angular.configs.tsRecommended,
            sonarjs.configs.recommended,
            importX.flatConfigs.recommended,
            unicorn.configs.recommended,
            // Must stay last: turns off everything prettier owns.
            prettier,
        ],
        settings: {
            'import-x/resolver-next': [importX.createNodeResolver()],
        },
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            'import-x/order': [
                'error',
                {
                    alphabetize: {
                        caseInsensitive: true,
                        order: 'asc',
                    },
                    'newlines-between': 'always',
                },
            ],
            // TypeScript resolves these itself; the plugin's resolver only
            // duplicates the work and disagrees about Angular's subpaths.
            'import-x/no-unresolved': 'off',
            // The node resolver reads the published JavaScript, where a
            // type-only export such as Routes or OnInit does not exist, so this
            // reports every one of them as missing. tsc checks this properly.
            'import-x/named': 'off',
            '@typescript-eslint/no-namespace': 'off',
            // Angular 22's own upgrade migration set ChangeDetectionStrategy.Eager
            // on every component to preserve pre-v22 behaviour. Moving to OnPush
            // is a behavioural change, and with no test suite to catch a missed
            // render it does not belong in a deployment change.
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
        },
    },
    {
        files: ['**/*.html'],
        extends: [angular.configs.templateRecommended, prettier],
        rules: {},
    },
]);
