import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// Add libraries containing invalid ESM here
	ssr: {
		noExternal: [ '@googlemaps/js-api-loader' ]
	}
});
