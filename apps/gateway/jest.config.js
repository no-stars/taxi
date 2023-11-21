module.exports = {
  rootDir: '.',
  displayName: 'gateway',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'apps/gateway/tsconfig.app.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@libs/common/(.*)$': '<rootDir>/../../libs/common/src/$1',
    '^@libs/communication/(.*)$': '<rootDir>/../../libs/communication/src/$1',
  },
}
