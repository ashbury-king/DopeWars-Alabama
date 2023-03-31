const esModules = ['vuetify'].join('|');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/tests/unit/index.ts'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,vue,js}'],
  coveragePathIgnorePatterns: ['vuetify.ts', 'main.ts'],
}
