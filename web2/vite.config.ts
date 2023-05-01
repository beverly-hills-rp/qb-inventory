import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [preact()],
    optimizeDeps: {
        include: ['react-dnd', 'react-dnd-touch-backend'],
    },
    build: {
        sourcemap: true,
    },
    esbuild: {
        jsxInject: "import { h } from 'preact'",
    }
});
