// Gera uma versão "duplo clique" (um único .html) para cada apresentação.
// Uso: npm run build:arquivo            → todas
//      npm run build:arquivo -- engenharia-reversa
import { build } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, existsSync, renameSync, rmSync, mkdirSync } from 'node:fs';

const root = fileURLToPath(new URL('..', import.meta.url));
const ignorar = new Set(['node_modules', 'dist', 'dist-arquivo', 'public', 'src', 'scripts', 'referencias']);
const pedidas = process.argv.slice(2);
const todas = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !ignorar.has(d.name) && !d.name.startsWith('.'))
  .map((d) => d.name)
  .filter((n) => existsSync(resolve(root, n, 'index.html')));
const alvo = pedidas.length ? pedidas : todas;

const saida = resolve(root, 'dist-arquivo');
mkdirSync(saida, { recursive: true });

for (const nome of alvo) {
  const tmp = resolve(saida, `.tmp-${nome}`);
  await build({
    root,
    configFile: false,
    base: './',
    logLevel: 'warn',
    plugins: [viteSingleFile({ removeViteModuleLoader: true })],
    build: {
      target: 'es2020',
      outDir: tmp,
      emptyOutDir: true,
      assetsInlineLimit: 100_000_000,
      chunkSizeWarningLimit: 5000,
      rollupOptions: { input: resolve(root, nome, 'index.html') },
    },
  });
  renameSync(resolve(tmp, nome, 'index.html'), resolve(saida, `${nome}.html`));
  rmSync(tmp, { recursive: true, force: true });
  console.log(`✓ dist-arquivo/${nome}.html`);
}
