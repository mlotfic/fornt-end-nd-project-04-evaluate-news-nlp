module.exports = {
    // Root directory for tests
    roots: ['./__tests__'],
  
    // Test environment for jsdom
    testEnvironment: 'jest-environment-jsdom',
  
    // Transform JavaScript files using Babel
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
  
    // Mock styles and assets
    moduleNameMapper: {
      '\\.(css|scss|less)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
  
    // Automatically clear mocks after each test
    clearMocks: true,
  
    // Specify test files to include
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
  
    // Coverage configuration
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/index.js', // Exclude main entry file
      '!src/**/webpack.*.js', // Exclude webpack configs
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
  };