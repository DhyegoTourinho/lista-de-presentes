import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/lista-de-presentes/', // <- Nome exato do repositório GitHub
});
