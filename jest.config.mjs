// jest.config.mjs
export default {
	transform: {
		'^.+\\.svelte$': 'svelte-jester',
		'^.+\\.js$': 'babel-jest'
	},
	testEnvironment: 'jest-environment-jsdom'
	// ... other configurations
};
