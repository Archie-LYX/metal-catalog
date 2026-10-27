import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');

mkdirSync(dist, { recursive: true });

for (const directory of ['src', 'assets']) {
  const target = join(dist, directory);
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
}

cpSync(join(root, 'index.html'), join(dist, 'index.html'));
cpSync(join(root, 'src'), join(dist, 'src'), { recursive: true });
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });

console.log('静态画册已打包到 dist/');
