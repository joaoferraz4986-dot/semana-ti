// Publica o site no GitHub Pages: gera o build e envia a pasta dist/ para o branch gh-pages.
// Uso: npm run publicar
import { execSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = resolve(root, 'dist');
const sh = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: 'inherit' });
const ler = (cmd) => execSync(cmd, { cwd: root }).toString().trim();

const origem = ler('git remote get-url origin');
const versao = ler('git rev-parse --short HEAD');

sh('npm run build');
writeFileSync(resolve(dist, '.nojekyll'), ''); // o GitHub Pages serve os arquivos como estão
rmSync(resolve(dist, '.git'), { recursive: true, force: true });
sh('git init -q -b gh-pages', dist);
sh('git add -A', dist);
sh(`git commit -q -m "Publicação do site (${versao})"`, dist);
sh(`git push -q -f "${origem}" gh-pages`, dist);
rmSync(resolve(dist, '.git'), { recursive: true, force: true });
console.log('\n✓ Publicado. Em 1 ou 2 minutos o site atualiza no GitHub Pages.');
