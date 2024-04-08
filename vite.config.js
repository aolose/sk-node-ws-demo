import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import ws from 'vite-sveltekit-node-ws';

export default defineConfig({
	plugins: [sveltekit(),ws()]
});
