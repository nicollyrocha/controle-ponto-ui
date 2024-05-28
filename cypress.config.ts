import { defineConfig } from 'cypress';

export default defineConfig({
	video: false,
	viewportWidth: 1366,
	viewportHeight: 860,
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		specPattern: ['cypress/e2e/functions.cy.ts'],
		baseUrl: 'http://localhost:3000',
	},
});
