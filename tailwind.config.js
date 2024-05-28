/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
	include: ['src/**/*'],
	exclude: ['node_modules'],
	compilerOptions: {
		baseUrl: 'src/',
	},
};
