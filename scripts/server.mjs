import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

createServer((req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${port}`);
  const decoded = decodeURIComponent(url.pathname);
  const requested = normalize(join(root, decoded === '/' ? 'index.html' : decoded));

  if (!requested.startsWith(root) || !existsSync(requested) || statSync(requested).isDirectory()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  res.writeHead(200, {
    'content-type': types[extname(requested).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store'
  });
  createReadStream(requested).pipe(res);
}).listen(port, () => {
  console.log(`微信产品画册预览地址：http://localhost:${port}`);
});
