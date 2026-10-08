import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const apiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const protoDir = path.join(apiRoot, 'src/external/tinkoff/protos');

const existing = (candidates) => candidates.find((candidate) => fs.existsSync(candidate));

const include = existing([
  path.join(apiRoot, 'node_modules/google-proto-files'),
  path.join(apiRoot, '../../node_modules/google-proto-files'),
]);
const bin = existing([
  path.join(apiRoot, 'node_modules/.bin/tsproto.cmd'),
  path.join(apiRoot, 'node_modules/.bin/tsproto'),
  path.join(apiRoot, '../../node_modules/.bin/tsproto.cmd'),
  path.join(apiRoot, '../../node_modules/.bin/tsproto'),
]);

if (!include || !bin) {
  console.error('tsproto or google-proto-files not found');
  process.exit(1);
}

const generated = spawnSync(bin, ['--path', protoDir, '--include', include], {
  cwd: apiRoot,
  stdio: 'inherit',
});
if (generated.status) {
  process.exit(generated.status);
}

for (const fileName of fs.readdirSync(protoDir)) {
  if (!fileName.endsWith('.ts')) {
    continue;
  }
  const filePath = path.join(protoDir, fileName);
  const source = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, source.replaceAll('export namespace public', 'export namespace _public'));
}
