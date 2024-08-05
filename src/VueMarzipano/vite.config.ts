// packages/vue-git-hub-browser/vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueMarzipano',
      fileName: (format) => `vue-marzipano.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue-marzipano.scss';
          return assetInfo.name;
        },
        globals: {
          vue: 'Vue'
        }
      },
    }
  }
});
