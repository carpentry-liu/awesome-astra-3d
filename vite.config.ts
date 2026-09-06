import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// This atlas exports static files. A Cloudflare Worker/Miniflare process is not needed.
export default defineConfig({css:{postcss:{plugins:[tailwindcss()]}},plugins:[vinext(),sites()]});
