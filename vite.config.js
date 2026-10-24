import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, existsSync } from 'node:fs';

// Cada pasta na raiz que tenha um index.html vira uma página (apresentação).
// Para registrar uma nova apresentação basta criar a pasta com o index.html.
const root = fileURLToPath(new URL('.', import.meta.url));
const ignorar = new Set(['node_modules', 'dist', 'dist-arquivo', 'public', 'src', 'scripts', 'referencias']);
const paginas = { hub: resolve(root, 'index.html') };
for (const nome of readdirSync(root, { withFileTypes: true })) {
  if (!nome.isDirectory() || ignorar.has(nome.name) || nome.name.startsWith('.')) continue;
  const html = resolve(root, nome.name, 'index.html');
  if (existsSync(html)) paginas[nome.name] = html;
}

export default defineConfig({
  base: './',
  server: { port: 5173, open: false },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: { input: paginas },
  },
});
