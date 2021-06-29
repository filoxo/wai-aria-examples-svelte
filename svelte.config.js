import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: preprocess(),
	kit: {
		adapter: netlify(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};
