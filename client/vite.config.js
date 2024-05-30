import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	define: {
		'process.env': {},
		global: 'window',
		Buffer: ['buffer', 'Buffer'],
	},
	resolve: {
		alias: {
			buffer: 'buffer',
		},
	},
})
