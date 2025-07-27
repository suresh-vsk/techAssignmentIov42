const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    //Increase the default timer to account for the performance user
    defaultCommandTimeout: 5000,
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to work
      await addCucumberPreprocessorPlugin(on, config);
      
      on("file:preprocessor", createBundler({ 
        plugins: [createEsbuildPlugin(config)] 
      }));
      
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});