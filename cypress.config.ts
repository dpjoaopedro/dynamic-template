import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200", // Set baseUrl to Angular dev server
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
