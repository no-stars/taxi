module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'comma-dangle': [
      'warn',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
      }
    ],
    'no-undef': 'warn',
    'no-async-promise-executor': 'warn',
    'no-inner-declarations': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-prototype-builtins': 'warn',
    'no-useless-escape': [
      'warn'
    ],
    'no-case-declarations': [
      'warn'
    ],
    'no-constant-condition': [
      'warn',
      {
        'checkLoops': false,
      }
    ],
    'indent': [
      'warn', 2,
      {
        // 1 - отступ case 2 пробела по отношению к switch
        'SwitchCase': 1,
        // без отступа для декоратора переменных
        'ignoredNodes': [
          `FunctionExpression > .params[decorators.length > 0]`,
          `FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
          `ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`,
        ],
      }
    ],
    'linebreak-style': [
      'warn', 'unix',
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn', 'never',
    ],
    'brace-style': [
      'warn', '1tbs',
    ],
    'no-unused-vars': [
      'warn', 'all',
    ],
    'max-len': [
      'warn',
      {
        'code': 120,
      }
    ],
    'key-spacing': [
      'warn',
      {
        'beforeColon': false,
        'afterColon': true,
      }
    ],
    // 'array-bracket-newline': [
    //   'warn',
    //   {
    //     'multiline': true,
    //     'minItems': 10,
    //   }
    // ],
    'object-property-newline': [
      'warn',
      {
        'allowAllPropertiesOnSameLine': false,
      }
    ],
    'operator-linebreak': [
      'warn', 'before',
      {},
    ],
    'no-trailing-spaces': [
      'warn',
      {
        'skipBlankLines': true,
        'ignoreComments': true,
      },
    ],
    'keyword-spacing': [
      'warn',
      {
        'before': true,
        'after': true,
      }
    ],
    'curly': [
      'warn',
      'all'
    ],
    'no-irregular-whitespace': [
      'error',
      {
        'skipRegExps': true,
        'skipTemplates': true,
        'skipStrings': true,
      }
    ],

    'padded-blocks': [
      'warn',
      {
        'blocks': 'never',
        'classes': 'always',
        'switches': 'never',
      },
    ],

    'space-in-parens': [
      'warn',
      'never',
    ],

    'class-methods-use-this': 'warn',

    'object-curly-newline': [
      'warn',
      {
        'consistent': true,
        'minProperties': 4,
      },
    ],

    'object-curly-spacing': [
      'warn', 'always'
    ],

    'no-use-before-define': [
      'warn',
      {
        'functions': false,
        'classes': false,
        'variables': false,
      },
    ],

    'arrow-parens': [
      'warn',
      'as-needed'
    ],

    'no-useless-constructor': 'off',
    'no-empty-function': 'off',

    'camelcase': [
      'warn',
      {
        'properties': 'never',
      },
    ],

    'import/prefer-default-export': [
      'warn',
    ],

    'no-continue': 'off',

    'max-classes-per-file': ['warn', 1],

    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
