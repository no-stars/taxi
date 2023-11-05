export default {
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['apps'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  rootDir: '.',
  projects: ['<rootDir>/**/jest.config.js'],
}
