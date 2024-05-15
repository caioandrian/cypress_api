const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 50000,
  pageLoadTimeout: 50000,
  global_timeout: 30000,
  numTestsKeptInMemory: 500,
  screenshotsFolder: 'cypress/reports/screenshots',
  video: false,
  modifyObstructiveCode: false,
  experimentalSourceRewriting: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    overwrite: false,
    html: false,
    video: false,
    json: true,
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reporterDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'My tests',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/test-results-[hash].xml',
      toConsole: true,
    },
  },
  chromeWebSecurity: false,
  retries: 0,
  e2e: {
    env: {
      grepOmitFiltered: true,
      grepFilterSpecs: true,
      snapshotOnly: true
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*spec.cy.js'
  },
})
