import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig(({ isPreview }) => ({
  // Preview generated HTML directly; Vinext middleware only knows app routes.
  appType: isPreview ? 'mpa' : undefined,
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: isPreview ? [] : [vinext()],
}));
