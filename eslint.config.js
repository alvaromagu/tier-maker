import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

const rules = {
  'accessor-pairs': [
    'error',
    { setWithoutGet: true, getWithoutSet: false, enforceForClassMembers: true },
  ],
  'array-callback-return': [
    'error',
    {
      allowImplicit: false,
      allowVoid: false,
      checkForEach: false,
    },
  ],
  'constructor-super': ['error'],
  curly: ['error', 'multi-line'],
  'default-case-last': ['error'],
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
  'no-async-promise-executor': ['error'],
  'no-caller': ['error'],
  'no-case-declarations': ['error'],
  'no-class-assign': ['error'],
  'no-compare-neg-zero': ['error'],
  'no-cond-assign': ['error'],
  'no-const-assign': ['error'],
  'no-constant-condition': ['error', { checkLoops: false }],
  'no-control-regex': ['error'],
  'no-debugger': ['error'],
  'no-delete-var': ['error'],
  'no-dupe-args': ['error'],
  'no-dupe-keys': ['error'],
  'no-duplicate-case': ['error'],
  'no-useless-backreference': ['error'],
  'no-empty': ['error', { allowEmptyCatch: true }],
  'no-empty-character-class': ['error'],
  'no-empty-pattern': ['error'],
  'no-eval': ['error'],
  'no-ex-assign': ['error'],
  'no-extend-native': ['error'],
  'no-extra-bind': ['error'],
  'no-extra-boolean-cast': ['error'],
  'no-fallthrough': ['error'],
  'no-func-assign': ['error'],
  'no-global-assign': ['error'],
  'no-import-assign': ['error'],
  'no-invalid-regexp': ['error'],
  'no-irregular-whitespace': ['error'],
  'no-iterator': ['error'],
  'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
  'no-lone-blocks': ['error'],
  'no-misleading-character-class': ['error'],
  'no-prototype-builtins': ['error'],
  'no-useless-catch': ['error'],
  'no-multi-str': ['error'],
  'no-new': ['error'],
  'no-new-func': ['error'],
  'no-new-symbol': ['error'],
  'no-new-wrappers': ['error'],
  'no-obj-calls': ['error'],
  'no-object-constructor': ['error'],
  'no-octal': ['error'],
  'no-octal-escape': ['error'],
  'no-proto': ['error'],
  'no-regex-spaces': ['error'],
  'no-return-assign': ['error', 'except-parens'],
  'no-self-assign': ['error', { props: true }],
  'no-self-compare': ['error'],
  'no-sequences': ['error'],
  'no-shadow-restricted-names': ['error'],
  'no-sparse-arrays': ['error'],
  'no-template-curly-in-string': ['error'],
  'no-this-before-super': ['error'],
  'no-throw-literal': ['off'],
  'no-undef-init': ['error'],
  'no-unexpected-multiline': ['error'],
  'no-unmodified-loop-condition': ['error'],
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  'no-unreachable': ['error'],
  'no-unreachable-loop': ['error'],
  'no-unsafe-finally': ['error'],
  'no-unsafe-negation': ['error'],
  'no-useless-call': ['error'],
  'no-useless-computed-key': ['error'],
  'no-useless-escape': ['error'],
  'no-useless-rename': ['error'],
  'no-useless-return': ['error'],
  'no-var': ['error'],
  'no-void': ['error', { allowAsStatement: true }],
  'no-with': ['error'],
  'object-shorthand': ['warn', 'properties'],
  'one-var': ['error', { initialized: 'never' }],
  'prefer-const': [
    'error',
    { destructuring: 'all', ignoreReadBeforeAssign: false },
  ],
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  'symbol-description': ['error'],
  'unicode-bom': ['error', 'never'],
  'use-isnan': [
    'error',
    {
      enforceForSwitchCase: true,
      enforceForIndexOf: true,
    },
  ],
  'valid-typeof': ['error', { requireStringLiterals: true }],
  yoda: ['error', 'never'],
  semi: ['error', 'never'],
  quotes: ['error', 'single'],
  "jsx-quotes": ["error", "prefer-single"]
}

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    ...rules
  }
})
