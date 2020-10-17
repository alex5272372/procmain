module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es2020': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],
    'prefer-destructuring': ['error',
      {
        'VariableDeclarator': {
          'array': false,
          'object': true
        },
        'AssignmentExpression': {
          'array': true,
          'object': true
        }
      },
      {
        'enforceForRenamedProperties': false
      }
    ]
  }
}
