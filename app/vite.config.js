import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@project-serum/anchor', '@solana/web3.js', 'buffer'],
		// ... use the same implementation from the SvelteKit ui
	},
	build: {
		target: 'esnext'
	  }
};

export default config;
