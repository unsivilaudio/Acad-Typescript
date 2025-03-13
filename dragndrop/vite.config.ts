import { defineConfig } from 'vite';
import tsconfigpaths from 'vite-tsconfig-paths';

export default defineConfig({
  esbuild: {
    target: 'es2022',
  },
  plugins: [tsconfigpaths()],
});
