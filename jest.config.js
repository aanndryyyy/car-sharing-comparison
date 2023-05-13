/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }]
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(carbon-icons-svelte))',
    '<rootDir>/node_modules/(?!(carbon-components-svelte))'
  ],
  moduleFileExtensions: ['js', 'ts', 'svelte']
};
