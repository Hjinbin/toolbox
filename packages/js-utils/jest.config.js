module.exports = {
  testEnvironment: 'node',
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.js$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
