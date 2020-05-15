module.exports = {
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(svg|jpg|png|css)$': '<rootDir>/spec/empty-module.js',
  },
  setupFilesAfterEnv: ['<rootDir>/spec/setup.js'],
};
