import { adapter } from 'sveltekit-adapter-aws';
// import { adapter } from '@jill64/sveltekit-aws-adapter'
// import adapter from '@sveltejs/adapter-static';
// import adapter from "svelte-kit-sst";

import preprocess from 'svelte-preprocess';

export default {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			autoDeploy: true,
		}),
	},
};