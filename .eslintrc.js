module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true,
    'jest/globals': true
  },
  'plugins': [
    'react', 'jest'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    sourceType: 'module'
  },
  'extends': [
    'plugin:react/recommended'
  ],
  'rules': {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'indent': [
      'error',
      2
    ],
    'no-unused-vars': 'error',
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ]
  }
}
