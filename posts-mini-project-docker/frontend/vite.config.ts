import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import tailwindcss from 'tailwindcss';

const cherryPickedKeys = [
  'VITE_API_URL',
];

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv: { [key: string]: string | undefined } = {};
  cherryPickedKeys.forEach((key) => {
    processEnv[key] = env[key];
  });

  return {
    envDir: './env',
    plugins: [react(), tsconfigPaths(), svgrPlugin()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    define: {
      'process.env': processEnv, 
    },
    server: {
      watch: {
        usePolling: true,
        interval: 1000, 
      },
      host: true, 
    },
    build: {
      sourcemap: true,
    },
  };
});
